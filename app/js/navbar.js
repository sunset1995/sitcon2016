require('./lib/dom.js');

var pages = [
	'home', 'schedule', 'sponsor', 'location'
];

var activePage = location.hash.slice(8) || 'home';
addClass(Qid('link-'+activePage), 'active');

for(var i=0; i<pages.length; ++i)
	addEvent(
		Qid('link-'+pages[i]),
		'click',
		function() {
			var which = pages[i];
			return function() {
				Qid('h-controller').style.height
				= Qid('page-'+which).offsetHeight + 'px';
				removeClass(Qid('link-'+activePage), 'active');
				activePage = which;
				addClass(Qid('link-'+activePage), 'active');
			};
		}()
	);	
