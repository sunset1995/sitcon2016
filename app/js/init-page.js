require('./lib/dom.js');

var initPage = location.hash.slice(8) || 'home';
location.hash = '#target-' + initPage;
initPage = 'page-' + initPage;
Qid('h-controller').style.height
	= Qid(initPage).offsetHeight + 'px';

setTimeout(function() {
	addClass(Qid('image-group-title'), 'active');
}, 100);
