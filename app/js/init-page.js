require('dom.js');

setTimeout(function() {
	addClass(Qid('image-group-title'), 'active');
}, 100);

window.onload = function() {
	Qid('loading-page').style.display = 'none';
}
