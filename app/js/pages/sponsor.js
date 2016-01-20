require('../lib/dom.js');
require('../lib/fancybox.js');

Qall('.sponsor .logo', function(dom) {
	var data = dom.querySelector('.data-storage');
	if( !data ) return;
	addEvent(dom, 'click', function() {
		fancybox.setContent(data.innerHTML);
		fancybox.open();
	});
})
