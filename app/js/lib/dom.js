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
getScrollY = function() {
	if (self.pageYOffset)
		return self.pageYOffset;
	else if (document.documentElement && document.documentElement.scrollTop)
		return document.documentElement.scrollTop;
	else if (document.body)
		return document.body.scrollTop;
};
getY = function(domObj) {
	return domObj.offsetTop;
}
