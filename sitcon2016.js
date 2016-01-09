(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('./init-page.js');
require('./navbar.js');

},{"./init-page.js":2,"./navbar.js":4}],2:[function(require,module,exports){
require('./lib/dom.js');

var initPage = location.hash.slice(8) || 'home';
location.hash = '#target-' + initPage;
initPage = 'page-' + initPage;
Qid('h-controller').style.height
	= Qid(initPage).offsetHeight + 'px';

},{"./lib/dom.js":3}],3:[function(require,module,exports){
/*
 *	This module just define global function,
 *	exporting nothing.
 */

Q = function(queryStr) {
	return document.querySelector(queryStr);
}
Qid = function(id) {
	return document.getElementById(id);
}
Qall = function(queryStr, func) {
	var tmp = document.querySelectorAll(queryStr);
	for(var i=0 ; i<tmp.length ; ++i)
		func(tmp[i], i);
	tmp = null;
}
addEvent = function(ele, eve, func) {
	if( ele.addEventListener ) ele.addEventListener(eve , func);
	else if( ele.attachEvent ) ele.attachEvent('on'+eve , func);
	else ele[eve] = func;
}
removeEvent = function(ele, eve, func) {
	if( ele.removeEventListener ) ele.removeEventListener(eve , func);
	else if( ele.detachEvent ) ele.detachEvent('on'+eve , func);
	else ele[eve] = null;
}
removeClass = function(ele , classname) {
	if( !ele || typeof ele.className === 'undefined' ) return;
	var reg = new RegExp(classname , "g");
	ele.className = ele.className.replace(reg, "");
}
addClass = function(ele , applyclass) {
	if( !ele || typeof ele.className === 'undefined' ) return;
	if( ele.className.indexOf(applyclass)!=-1 ) return;
	if( ele.className.length>0 ) ele.className += ' '+applyclass;
	else ele.className = applyclass;
}

},{}],4:[function(require,module,exports){
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

},{"./lib/dom.js":3}]},{},[1])