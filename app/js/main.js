require('./lib/dom.js');

var text = '';
for(var i=0; i<2000; ++i) text += 'kano dai suki ';
Qid('page1').innerHTML = text;	

text = ''
for(var i=0; i<500; ++i) text += 'an apple a day keep doctor away ';
Qid('page2').innerHTML = text;

addEvent(Qid('leftbtn'), 'click', function() {
	Qid('h-controller').style.height = '1500px';
	Qid('x-controller').style.left = '0';
});
addEvent(Qid('rightbtn'), 'click', function() {
	Qid('h-controller').style.height = '1000px';
	Qid('x-controller').style.left = '-100%';
});
