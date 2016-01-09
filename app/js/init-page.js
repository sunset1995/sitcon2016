require('./lib/dom.js');

var initPage = location.hash.slice(8) || 'home';
initPage = 'page-' + initPage;
Qid('h-controller').style.height
	= Qid(initPage).offsetHeight + 'px';
