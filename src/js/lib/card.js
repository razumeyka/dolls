var initialX=0;
var currentX=0;
var activeslide=0;
var active = false;
var margin=25;

function initcardslider(){
	console.log(window.innerWidth);
	console.log('initcardsslider');
	if(window.innerWidth<1024){
		initialX=0;
		currentX=0;
		activeslide=0;
		active = false;
		$('.slides_list').css('width',$('.slides_list .slide').length+'00%');
		$('.slides_list .slide').css('width',1/$('.slides_list .slide').length*100+'%').removeClass('active');
		$('.super_slider .controls-mobile__control').last().addClass('active');
	}else{
		activeslide=0;
		$('.slides_list').css('width','120px');
		$('.slides_list .slide').css('width','100%');
		$('.slides_list a').first().click();
	}
		
}
function setdesktopslide(index){
	$('.slides_list').css('transform','translateY(-'+(index*(margin+$('.slides_list .slide').height()))+'px)');
}
$(document).ready(function(){
	
	$(window).resize(function(){
		initcardslider();
	})
	$('.super_slider').on("touchstart mousedown", function(e){
		if(window.innerWidth>=1024)return;
		console.log('touchstart');
		//e.preventDefault();
		active=true;
		var width=$('.slides_list .slide').width()
		$('.slides_list').addClass('notrans');
		if (e.type === "touchstart") {
		 initialX = e.touches[0].clientX - width*activeslide;
		}else{
		 initialX = e.clientX - width*activeslide;
		}
		//console.log(initialX);
	});
	
	$('.super_slider').on("touchmove mousemove", function(e){
		if(window.innerWidth>=1024)return;
		if(!active)return;
		var x=currentX;
		if (e.type === "touchmove") {
		  currentX = e.touches[0].clientX - initialX;
		} else {
		  currentX = e.clientX - initialX;
		}
		if(Math.abs(x-currentX)<20){
			currentX=x;
		}
		//console.log($('.slides_list').css('transform'));
		$('.slides_list').css('transform','translateX('+currentX+'px)')
		
	});
	$('body').on('touchend mouseup',function(e){
		if(window.innerWidth>=1024)return;
		if(!active) return;
		if(e.type=="touchend"&&e.cancelable){
			e.preventDefault();
		}
		//console.log(e.touches[0]);
		active=false;
		$('.slides_list').removeClass('notrans');
		var width=$('.slides_list .slide').width()
		var count=$('.slides_list .slide').length-1;
		//console.log('touchend');
		var md=currentX-activeslide*$('.slides_list .slide').width();
		if(Math.abs(md)>60){
			slide=activeslide+md/Math.abs(md);
		}
		//console.log(initialX);
		//var slide=Math.round(currentX/width);
		if(slide>0)slide=0;
		if(slide<-count) slide=-count;
		currentX=slide*width;
		$('.super_slider .controls-mobile__control').removeClass('active');
		$('.super_slider .controls-mobile__control').eq(slide-1).addClass('active');
		$('.slides_list').css('transform','translateX('+slide/(count+1)*100+'%)');
		activeslide=slide;
	});
	$('.card__controls .card__control').click(function(){
		var movecan=(($('.slides_list .slide').height()+margin)*$('.slides_list .slide').length-margin-$('.slides_list').height())/($('.slides_list .slide').height()+margin)
		console.log(movecan);
		/*  -(height_slider/(height_sliderblock+margin)-slidecount)) */
		if($(this).hasClass('card__control_next'))activeslide++;
		if($(this).hasClass('card__control_prev'))activeslide--;
		if(activeslide<0)activeslide=0;
		if(activeslide>movecan)activeslide=movecan;
		//console.log(activeslide);
		setdesktopslide(activeslide);
	});	
	$('.slides_list a').click(function(e){
		console.log('click')
		e.preventDefault();
		if(window.innerWidth<1024)return;
		console.log('click')
		$('.slides_list a').removeClass('active');
		$(this).addClass('active');
		if($('.big_image .img').is(':visible')){
			console.log('click')
			$('.big_image .img').css('background','url('+$(this).attr('href')+') no-repeat center').css('background-size','contain');

		}
	});
	initcardslider();	

});

