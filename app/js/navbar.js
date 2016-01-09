require('./lib/dom.js');

var pages = [
	'about', 'location', 'speaker',
	'schedule', 'sponsor', 'team'
];

for(var i=0; i<pages.length; ++i)
	addEvent(
		Qid('link-'+pages[i]),
		'click',
		function() {
			var which = pages[i];
			return function() {
				Qid('h-controller').style.height
				= Qid(which+'-page').offsetHeight + 'px';
			};
		}()
	);	
