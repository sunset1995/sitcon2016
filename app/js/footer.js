require('./lib/dom.js');
var ajax = require('superagent');

var staffsDOM = Qid('staffs');

var queueStaffCard = function(items, delay, callback) {

    var currentItemId = 0;
    var tasks = []
    var resolver = function() {
        currentItemId++

        if(tasks[currentItemId]) {
            tasks[currentItemId](resolver)
        } else {
            if(callback) callback()
        }
    }

    var worker = function(cardDOM) {
        return function(next) {
            removeClass(cardDOM, 'unactive')
            setTimeout(next, delay)
        }
    }

    for(var i = 0; i < items.length; i++) {
        tasks.push(worker(items[i]))
    }

    tasks[0](resolver)
}

// Control the slidein animate
var slideInAnimator = function() {
	// This function count how px the domObj above bottom line of window
	var aboveBtn = function(domObj) {
		return getScrollY()
				+ window.innerHeight
				- getY(domObj);
	}
	// The y position in array groups
	// must be from top to bottom
	var groups = [];
	var nowid=0;
	// Locked while fliping img
	var locked=0;

	return {
		regist: function(newGroup) {
			groups.push(newGroup);
		},
		proc: function() {
			if( locked ) return;
			if( nowid==groups.length ) {
				removeEvent(window, 'scroll', slideInAnimator.proc);
				groups = null;
				slideInAnimator = null;
				return;
			}
			locked = 1;
			if( aboveBtn(groups[nowid]) > 150 ) {

                var members = groups[nowid].querySelectorAll('.staff-photo-container');
                // NOTE: Behavior changed, it will wait last animation finished to start next
                // This can change by wrapper a new function and as another callback to resolve
                queueStaffCard(members, 80, function() {
                    locked = 0
                })

                ++nowid;

            }
			else locked = 0;
		}
	}
}();

// Process API data
var procStaff = function(staffs) {
	for(var i in staffs) {
		var current_group = staffs[i];

		var groupDOM = document.createElement('div');
		groupDOM.id = 'group' + current_group.pk;
		groupDOM.className = 'group';

		var h2 = document.createElement('h2');
		h2.innerText = current_group.name;
		groupDOM.appendChild(h2);

		var group_members = current_group.users;
		sortGroup(group_members);
		group_members = group_members.filter(Boolean);
		for(var j in group_members) {
			var member = group_members[j];
			var staff_card = generate_staff_card(member.profile, member.pk);
			groupDOM.appendChild(staff_card);
		}

		staffsDOM.appendChild(groupDOM);
		slideInAnimator.regist(groupDOM);
		groupDOM = null;
	}
	addEvent(window, 'scroll', slideInAnimator.proc);
}

ajax.get('https://staff.sitcon.org/api/staffgroups/')
	.query({format: 'json'})
	.end(function(err, res) {
		var staffs = JSON.parse(res.text);
		procStaff(staffs);
	});

/*
*	Below code are not relate to the code logic
*/

// Generate each member card
function generate_staff_card(member, member_pk) {
	var card = document.createElement('div');
	var imgFrame = document.createElement('div');
	var imgs = document.createElement('div');
	var imgloader = document.createElement('img');
	var imgFront = document.createElement('div');
	var imgBack = document.createElement('div');
	var name = document.createElement('p');

	card.className = 'staff-card';
	imgFrame.className = 'photo-frame';
	imgs.className = 'staff-photo-container unactive';
	imgFront.className = 'staff-photo';
	imgloader.style.display = 'none';

	var avatar_url, avatar = member.avatar;
	if(avatar.substr(0, 4) == 'http') {
		if(avatar.indexOf('gravatar.com/') > -1) {
			avatar_url = avatar + '&s=80';
		} else {
			avatar_url = avatar;
		}
	} else {
		avatar_url = 'https://staff.sitcon.org/users/' + member_pk + '/photo/small';
	}
	imgloader.src = avatar_url;
	imgFront.style.backgroundImage = 'url("' + avatar_url + '")';

	imgBack.className = 'stone-photo';
	name.innerText = member.display_name;

	imgs.appendChild(imgFront);
	imgs.appendChild(imgBack);
	imgFrame.appendChild(imgs);
	card.appendChild(imgFrame);
	card.appendChild(name);
	return card;
}
// Sorting each groups' member appearing order
function sortGroup(member) {
	var len = member.length;
	for(var i=0; i<len; ++i)
		if( member[i].profile.title.search('暨')!=-1 ) {
			member.push( member[i] );
			member[i] = null;
		}
}
