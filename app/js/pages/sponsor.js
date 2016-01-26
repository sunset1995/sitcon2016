require('dom.js');
require('fancybox.js');

Qall('.sponsor .logo', function(dom) {
	var data = dom.querySelector('.data-storage');
	if( !data ) return;
	addEvent(dom, 'click', function() {
		fancybox.setContent(data.innerHTML);
		fancybox.open();
	});
});

addEvent(Qid('conf-map'), 'click', function() {
	var data = Qid('conf-map').querySelector('.data-storage');
	return function() {
		console.log(data)
		fancybox.setContent(data.innerHTML);
		fancybox.open();
	}
}());
