require('../lib/dom.js');
var ajax = require('superagent');

// Process API data
var procConf = function(confs) {
	for(var i=0; i<confs.length; ++i) {
		var nowTitle = confs[i].title;
		var nowAbstract = confs[i].abstract;
		var nowSpeaker = confs[i].speaker.profile.display_name;
		var nowBio = confs[i].speaker.profile.bio;
		var nowImg = imgUrl(confs[i].speaker.profile.avatar);
		var nowRoom = confs[i].room.slice(0, 2);
		var nowStart = new Date(confs[i].start);
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
		addEvent(dom, 'click', function() {
			fancybox.setContent(detail.innerHTML);
			fancybox.open();
		});
	});
}

ajax.get('https://cfp.sitcon.org/api/submissions/')
	.query({format: 'json'})
	.end(function(err, res) {
		var confs = JSON.parse(res.text);
		procConf(confs);
	});

/*
*	Below is cumbersome code ==
*/
function imgUrl(ori) {
	if( ori.slice(0, 4)=='http' ) return ori;
	else return 'https://cfp.sitcon.org'+ori;
}
function createTitle(title) {
	var div = document.createElement('div');
	div.className = 'title';
	div.innerHTML = title;
	return div;
}
function createSpeaker(url, speakerName) {
	var div = document.createElement('div');
	var img = document.createElement('div');
	var name = document.createElement('span');
	div.className = 'speaker';
	img.className = 'photo';
	img.style.backgroundImage = 'url('+url+')';
	name.innerHTML = speakerName;
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
	h1Title.innerHTML = title;
	pAbstract.innerHTML = abstract;
	h1Speaker.innerHTML = speaker;
	pBio.innerHTML = bio;
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
