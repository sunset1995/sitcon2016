require('dom.js');

var initPage = location.hash.slice(8) || 'home';
location.hash = '#target-' + initPage;
initPage = 'page-' + initPage;
var resize_things = function() {
	Qid('h-controller').style.height =
		Qid(initPage).offsetHeight + 'px';
};

resize_things();

Qall('#page-sponsor img', function(element) {
	addEvent(element, 'load', resize_things);
});

setTimeout(function() {
	addClass(Qid('image-group-title'), 'active');
}, 100);

window.onload = function() {
	Qid('loading-page').style.display = 'none';
}
