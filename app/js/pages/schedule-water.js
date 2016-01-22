require('dom.js');
require('resize-handler.js');
require('fancybox.js');
var ajax = require('superagent');
var perfectScrollBar = require('perfect-scrollbar');

// Process API data
var procConf = function(sessions) {
	for(var i in sessions) {
		var session = sessions[i];

		var nowTitle = session.title;
		var nowAbstract = session.abstract;
		var nowSpeaker = session.speaker.profile.display_name;
		var nowBio = session.speaker.profile.bio;
		var nowImg = get_speaker_avatar_url(session.speaker);
		var nowRoom = session.room.slice(0, 2);
		var nowStart = new Date(session.start);
		var id = nowRoom 
					+ '-'
					+ nowStart.getUTCHours().toString()
					+ nowStart.getUTCMinutes().toString();
		var dom = Qid(id);
		
		var img = document.createElement('img');
		img.src = nowImg;
		img.style.display = 'none';
		dom.appendChild(img);

		dom.appendChild(createTitle(nowTitle));
		dom.appendChild(createSpeaker(nowImg, nowSpeaker));
		dom.appendChild(createDetail(
			nowTitle, nowAbstract, nowSpeaker, nowBio, nowImg));
	}

	Qall('.confslot', function(dom) {
		var detail = dom.querySelector('.data-storage');
        if(detail) {
            addEvent(dom, 'click', function() {
                fancybox.setContent(detail.innerHTML);
                fancybox.open();
            });
        }
	});
}

ajax.get('https://cfp.sitcon.org/api/submissions/')
	.query({format: 'json'})
	.end(function(err, res) {
		var confs = JSON.parse(res.text);
		procConf(confs);
	});

var checkWidth = function() {
	var timetableContainer = Qid('conference-time');
	perfectScrollBar.initialize(timetableContainer, {
				suppressScrollY: true,
				suppressScrollX: false
			});
	return function() {
		perfectScrollBar.destroy(timetableContainer);
		if(timetableContainer.offsetWidth < 800)
			perfectScrollBar.initialize(timetableContainer, {
				suppressScrollY: true,
				suppressScrollX: false
			});
		else
			perfectScrollBar.initialize(timetableContainer, {
				suppressScrollY: true,
				suppressScrollX: true
			});
	}
}();
checkWidth();
resizeHandler.regist(checkWidth);

/*
*	Below is cumbersome code ==
*/
function get_speaker_avatar_url(speaker) {
	var avatar = speaker.profile.avatar;
	if(avatar.substr(0, 4) == 'http') {
		if(avatar.indexOf('gravatar.com/') > -1) {
			return avatar + '&s=80';
		} else {
			return avatar;
		}
	} else {
		return 'https://cfp.sitcon.org/users/' + speaker.pk + '/photo/medium';
	}
}
function createTitle(title) {
	var div = document.createElement('div');
	div.className = 'title';
	div.textContent = title;
	return div;
}
function createSpeaker(url, speakerName) {
	var div = document.createElement('div');
	var img = document.createElement('div');
	var name = document.createElement('span');
	div.className = 'speaker';
	img.className = 'photo';
	img.style.backgroundImage = 'url('+url+')';
	name.textContent = speakerName;
	div.appendChild(img);
	div.appendChild(name);
	return div;
}
function createDetail(title, abstract, speaker, bio, imgurl) {
	var right = document.createElement('div');
	var h1Title = document.createElement('h1');
	var pAbstract = document.createElement('p');
	var h1Speaker = document.createElement('h1');
	var pBio = document.createElement('p');
	h1Title.textContent = title;
	pAbstract.textContent = abstract;
	h1Speaker.textContent = speaker;
	pBio.textContent = bio;
	right.appendChild(h1Title);
	right.appendChild(pAbstract);
	right.appendChild(h1Speaker);
	right.appendChild(pBio);
	right.className = 'right';

	var left = document.createElement('div');
	var img = document.createElement('div');
	img.className = 'photo';
	img.style.backgroundImage = 'url('+imgurl+')';
	left.className = 'left';
	left.appendChild(img);

	var container = document.createElement('div');
	container.className = 'data-conf';
	container.appendChild(left);
	container.appendChild(right);

	var storage = document.createElement('div');
	storage.className = 'data-storage';
	storage.appendChild(container);
	return storage;
}
