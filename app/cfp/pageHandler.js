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
$.get("CFP" , function(data){
	$('#second_page').html(data);
},"html");

$('#CFP_button').click(function(){
	$('#second_page').css('display' , 'block');
	$('#first_page').addClass('move_page');
	setTimeout(function(){
		$('#first_page').css('display' , 'none');
		$('#second_page').addClass('move_page');
	} , 100);
	setTimeout(function(){
		$('#page1_button').addClass('move_page');
	} , 500);
});

$('#page1_button').click(function(){
	$('#page1_button').removeClass('move_page');
	setTimeout(function(){
		$('#second_page').removeClass('move_page');
	} , 200);
	setTimeout(function(){
		$('#first_page').css('display' , 'block');
		$('#second_page').css('display' , 'none');
	} , 500);
	setTimeout(function(){
		$('#first_page').removeClass('move_page');
	} , 550)
});