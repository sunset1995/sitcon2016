// arrow slide down after scroll	
var arrowShowPage = function(){
	var scrollY = self.pageYOffset ||
						document.documentElement.scrollTop ||
						document.body.scrollTop;
	if( scrollY > 0 ){
		$(window).unbind('scroll' , arrowShowPage);
		$('#arrow').addClass('scrolled');
	}
}
$(window).bind('scroll' , arrowShowPage);
arrowShowPage();

// lock page before loading all image
$('body').css('overflowY' , 'hidden');
var loadComplete = function(){
	var lock = true;
	return function(){
		if( !lock ) return;
		lock = false;
		document.body.style.overflowY = 'scroll';
		$('.wait_load').each(function(id,ele){
			$(ele).addClass('done_load');
		});
		$(window).unbind('load' , loadComplete);
	}
}();
$(window).bind('load' , loadComplete);
setTimeout( loadComplete , 5000 );

// load CFP
//$('#CFP_button').click(function(){
	$.get("CFP" , function(data){
		$('#second_page').html(data);
	},"html")
//});