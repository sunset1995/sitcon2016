require('dom.js');
require('resize-handler.js');

var pages = [
	'home', 'schedule', 'sponsor', 'location'
];

var activePage = location.hash.slice(8) || 'home';
addClass(Qid('link-'+activePage), 'active');

var footerSponsorDOM = Qid('footer-sponsor');
if( activePage==='sponsor' )
	footerSponsorDOM.style.display = 'none';

for(var i=0; i<pages.length; ++i)
	addEvent(
		Qid('link-'+pages[i]),
		'click',
		function() {
			var which = pages[i];
			var footerSponsorToggle = null;
			if( which==='sponsor' )
				footerSponsorToggle = function() {
					footerSponsorDOM.style.display = 'none';
				}
			else
				footerSponsorToggle = function() {
					footerSponsorDOM.style.display = 'block';
				}
			return function() {
				footerSponsorToggle();
				Qid('h-controller').style.height
				= Qid('page-'+which).offsetHeight + 'px';
				removeClass(Qid('link-'+activePage), 'active');
				activePage = which;
				addClass(Qid('link-'+activePage), 'active');
			};
		}()
	);	

// source in /js/lib/resize-handler
resizeHandler.regist(function() {
	Qid('h-controller').style.height
	= Qid('page-'+activePage).offsetHeight + 'px';
});
