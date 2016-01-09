require('./lib/dom.js');

var pages = [
	'home', 'schedule', 'sponsor', 'location'
];

for(var i=0; i<pages.length; ++i)
	addEvent(
		Qid('link-'+pages[i]),
		'click',
		function() {
			var which = pages[i];
			return function() {
				Qid('h-controller').style.height
				= Qid('page-'+which).offsetHeight + 'px';
			};
		}()
	);	
