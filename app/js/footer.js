require('./lib/dom.js');
var ajax = require('superagent');

var staffsDOM = Qid('staffs');

// This function count how px the domObj above bottom line of window
var aboveBtn = function(domObj) {
	return getScrollY()
			+ window.innerHeight
			- getY(domObj);
}

// Lazy loading staff photo when scroll to staff area
var lazy = function() {
	var loaded = false;
	var lazylist = [];
	var createHandle = function(photoDOM, url) {
		return function() {
			addClass(photoDOM, 'loaded');
			photoDOM.style.backgroundImage = 'url('+url+')';
		};
	};

	return {
		regist: function(card) {
			lazylist.push(card);
		},
		check: function() {
			if( loaded ) return;
			if( aboveBtn(staffsDOM) < 400 )
				return;
			loaded = true;
			removeEvent(window, 'scroll', lazy.check);
			for(var i in lazylist) {
				var now = lazylist[i];
				now.loader.onload = createHandle(now.img, now.loader.textContent);
				now.loader.src = now.loader.textContent;
			}
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
		h2.textContent = current_group.name;
		groupDOM.appendChild(h2);

		var group_members = current_group.users;
		sortGroup(group_members);
		group_members = group_members.filter(Boolean);
		for(var j in group_members) {
			var member = group_members[j];
			var staff_card = generate_staff_card(member.profile, member.pk);
			groupDOM.appendChild(staff_card);
			lazy.regist({
				img: staff_card.children[0],
				loader: staff_card.children[1]
			});
		}

		staffsDOM.appendChild(groupDOM);
		groupDOM = null;
	}
	//img.style.backgroundImage = 'url("' + avatar_url + '")';
	addEvent(window, 'scroll', lazy.check);
	lazy.check();
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
	var img = document.createElement('div');
	var imgloader = document.createElement('img');
	var name = document.createElement('p');

	card.className = 'staff-card';
	img.className = 'staff-photo';
	imgloader.className = 'staff-photo-loader';

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
	imgloader.textContent = avatar_url;

	name.textContent = member.display_name;

	card.appendChild(img);
	card.appendChild(imgloader);
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
