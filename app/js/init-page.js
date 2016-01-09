require('./lib/dom.js');

if( typeof location.hash !== 'undefined'
	&&  location.hash.slice(8).length != 0 )
	Qid('h-controller').style.height
	= Qid(location.hash.slice(8)+'-page').offsetHeight + 'px';
else
	Qid('h-controller').style.height
	= Qid('about-page').offsetHeight + 'px';
