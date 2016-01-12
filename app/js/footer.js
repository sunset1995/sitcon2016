require('./lib/dom.js');
var ajax = require('superagent');

var staffsDOM = Qid('staffs');

// Control the slidein animate
var slideInAnimator = function() {
	// This function flip the staffs' img of a group to front
	var flipIn = function(group) {
		var fliper = function(domObj) {
			return function() {
				removeClass(domObj, 'unactive');
			};
		}
		var delay = 0;
		var members = group.querySelectorAll('.staff-photo-container');
		var leftmost = getX(members[0]);
		for(var i=0; i<members.length; ++i) {
			if( getX(members[i])==leftmost )
				delay = 0;
			setTimeout(fliper(members[i]), delay);
			delay += 80;
		}
	}
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
				flipIn(groups[nowid]);
				++nowid;
				setTimeout(function(){
					locked = 0;
					slideInAnimator.proc();
				}, 100);
			}
			else locked = 0;
		}
	}
}();

// Process API data
var procStaff = function(staffs) {
	for(var i=0; i<staffs.length; ++i) {
		var nowGroup = staffs[i];

		var groupDOM = document.createElement('div');
		groupDOM.id = 'group' + nowGroup.pk;
		groupDOM.className = 'group';

		var h2 = document.createElement('h2');
		h2.innerHTML = nowGroup.name;
		groupDOM.appendChild(h2);

		var member = nowGroup.users;
		sortGroup(member);
		for(var j=0; j<member.length; ++j)
			if( member[j] !== null )
				groupDOM.appendChild(
					staffCard(member[j].profile)
				);

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
function staffCard(member) {
	var card = document.createElement('div');
	var imgFrame = document.createElement('div');
	var imgs = document.createElement('div');
	var imgFront = document.createElement('div');
	var imgBack = document.createElement('div');
	var name = document.createElement('p');

	card.className = 'staff-card';
	imgFrame.className = 'photo-frame';
	imgs.className = 'staff-photo-container unactive';
	imgFront.className = 'staff-photo';
	if( member.avatar.slice(0, 4) !== 'http' )
		imgFront.style.backgroundImage = 'url(https://staff.sitcon.org' + member.avatar + ')';
	else
		imgFront.style.backgroundImage = 'url(' + member.avatar + '&s=80)';
	imgBack.className = 'stone-photo';
	name.innerHTML = member.display_name;
	
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
