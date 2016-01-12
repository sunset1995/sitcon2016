require('./lib/dom.js');
var ajax = require('superagent');

var staffsDOM = Qid('staffs');
var staffCard = function(member) {
	var card = document.createElement('div');
	var img = document.createElement('div');
	var name = document.createElement('p');

	card.className = 'staff-card';
	img.className = 'staff-photo';
	if( member.avatar.slice(0, 4) !== 'http' )
		img.style.backgroundImage = 'url(https://staff.sitcon.org' + member.avatar + ')';
	else
		img.style.backgroundImage = 'url(' + member.avatar + ')';
	name.innerHTML = member.display_name;
	
	card.appendChild(img);
	card.appendChild(name);
	return card;
}
var sortGroup = function(member) {
	var len = member.length;
	for(var i=0; i<len; ++i)
		if( member[i].profile.title.search('暨')!=-1 ) {
			member.push( member[i] );
			member[i] = null;
		}
}
var procStaff = function(staffs) {
	for(var i=0; i<staffs.length; ++i) {
		var nowGroup = staffs[i];

		var groupDOM = document.createElement('div');
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
	}
}

ajax.get('https://staff.sitcon.org/api/staffgroups/')
	.query({format: 'json'})
	.end(function(err, res) {
		var staffs = JSON.parse(res.text);
		procStaff(staffs);
	});
