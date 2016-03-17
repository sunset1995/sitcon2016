require('dom.js');
require('resize-handler.js');
require('fancybox.js');
var ajax = require('superagent');
var perfectScrollBar = require('perfect-scrollbar');

var briefing = {
	18: 'https://speakerdeck.com/pingnote/sitcon-2016-cross-platform-bim',
	79: 'http://www.slideshare.net/choujohn351/dsl-58795980',
	88: 'https://www.facebook.com/media/set/?set=a.507914002721762.1073741829.504797396366756&type=3&uploaded=56',
	80: 'http://www.slideshare.net/ssuser803c6e/arm-uvisor-debug-refinement-project',
	69: 'https://speakerdeck.com/tjjh89017/sitcon-2016-arm-cloud-project',
	66: 'https://drive.google.com/file/d/0BzP5BGih9Ax7M2o0b1pMQS1jLXc/view?usp=sharing',
	32: 'https://www.icloud.com/keynote/000YPbYqn6et7dbCHO2MTxc3g#%E5%8B%92%E7%B4%A2%E8%BB%9F%E9%AB%94SITCON',
	17: 'http://slid.es/akira02/wall',
	12: 'http://www.slideshare.net/bekketmcclane/war-of-native-speed-on-web-sitcon2016',
	56: 'http://slides.com/michael34435/intern_in_your_journey',
	19: 'https://goo.gl/0nfKQA',
	57: 'http://www.slideshare.net/chiunhau/js-library',
	26: 'http://slides.pastleo.me/SITCON_2016_myStyle/',
	16: 'http://www.slideshare.net/Chengchiatseng/sitcon-2016',
	30: 'http://slides.com/meng-yingtsai/sitcon2016',
	50: 'http://www.slideshare.net/s3131212/got-your-pw',
};

// Process API data
var procConf = function(sessions) {
	for(var i in sessions) {
		var session = sessions[i];

		var nowTitle       = session.title;
		var nowAbstract    = session.abstract;
		var nowBriefingURL = briefing[session.speaker.pk] || null;
		var nowSpeaker     = session.speaker.profile.display_name;
		var nowBio         = session.speaker.profile.bio;
		var nowImg         = get_speaker_avatar_url(session.speaker);
		var nowRoom        = session.room.slice(0, 2);
		var nowStart       = new Date(session.start);
		var id             = nowRoom
					+ '-'
					+ nowStart.getUTCHours().toString()
					+ nowStart.getUTCMinutes().toString();
		var dom = Qid(id);
		if( dom===null )
			continue;

		var img           = document.createElement('img');
		img.src           = nowImg;
		img.style.display = 'none';
		dom.appendChild(img);

		dom.appendChild(createTitle(nowTitle));
		dom.appendChild(createSpeaker(nowImg, nowSpeaker));
		dom.appendChild(createLink(briefing[session.speaker.pk] || null));
		dom.appendChild(createDetail(
			nowTitle, nowAbstract, nowSpeaker, nowBio, nowImg, nowBriefingURL));
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

ajax.get('submissions.json')
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
		return avatar
	}
}
function createTitle(title) {
	var div         = document.createElement('div');
	div.className   = 'title';
	div.textContent = title;
	return div;
}
function createSpeaker(url, speakerName) {
	var div  = document.createElement('div');
	var img  = document.createElement('div');
	var name = document.createElement('span');
	div.className = 'speaker';
	img.className = 'photo';
	img.style.backgroundImage = 'url('+url+')';
	name.textContent = speakerName;
	div.appendChild(img);
	div.appendChild(name);
	return div;
}
function createLink(link) {
	var a         = document.createElement('a');
	a.className   = 'briefing-link';
	if( link ) {
		a.target      = '_blank';
		a.href        = link;
		a.textContent = '#簡報連結';
		a.onclick     = function(e) {
			e.stopPropagation();
		}
	}
	return a;
}
function createDetail(title, abstract, speaker, bio, imgurl, briefingURL) {
	var right     = document.createElement('div');
	var h1Title   = document.createElement('h1');
	var pAbstract = document.createElement('p');
	var h1Speaker = document.createElement('h1');
	var pBio      = document.createElement('p');
	h1Title.textContent   = title;
	pAbstract.textContent = abstract;
	h1Speaker.textContent = speaker;
	pBio.textContent      = bio;
	right.appendChild(h1Title);
	right.appendChild(pAbstract);
	right.appendChild(h1Speaker);
	right.appendChild(pBio);
	right.className = 'right';

	var left       = document.createElement('div');
	var img        = document.createElement('div');
	img.className  = 'photo';
	img.style.backgroundImage = 'url('+imgurl+')';
	left.className = 'left';
	left.appendChild(img);
	if( briefingURL ) {
		var briefingLink         = document.createElement('a');
		briefingLink.href        = briefingURL;
		briefingLink.textContent = '#簡報連結';
		briefingLink.target      = '_blank';
		left.appendChild(briefingLink);
	}

	var container       = document.createElement('div');
	container.className = 'data-conf';
	container.appendChild(left);
	container.appendChild(right);

	var storage       = document.createElement('div');
	storage.className = 'data-storage';
	storage.appendChild(container);
	return storage;
}
