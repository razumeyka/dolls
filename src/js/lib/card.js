$(document).ready(function(){
	if(window.innerWidth<1024){
		var initialX=0;
		var currentX=0;
		//var offsetX=0;
		var activeslide=0;
		var active = false;
		
		$('.slides_list').css('width',$('.slides_list .slide').length+'00%');
		$('.slides_list .slide').css('width',1/$('.slides_list .slide').length*100+'%');
		
		$('.super_slider').on("touchstart mousedown", function(e){
			e.preventDefault();
			active=true;
			var width=$('.slides_list .slide').width()
			$('.slides_list').addClass('notrans');
			if (e.type === "touchmove") {
			 initialX = e.touches[0].clientX - width*activeslide;
			}else{
			 initialX = e.clientX - width*activeslide;
			}
		});
		
		$('.super_slider').on("touchmove mousemove", function(e){
			
			e.preventDefault();
			if(!active)return;
			if (e.type === "touchmove") {
			  currentX = e.touches[0].clientX - initialX;
			} else {
			  currentX = e.clientX - initialX;
			}
			$('.slides_list').css('transform','translateX('+currentX+'px)')
			
		});
		$('body').on('touchend mouseup',function(e){
			e.preventDefault();
			active=false
			$('.slides_list').removeClass('notrans');
			var width=$('.slides_list .slide').width()
			var count=$('.slides_list .slide').length-1;
			var slide=Math.round(currentX/width);
			if(slide>0)slide=0;
			if(slide<-count-1) slide=-count;
			currentX=slide*width;
			$('.super_slider .controls-mobile__control').removeClass('active');
			$('.super_slider .controls-mobile__control').eq(slide-1).addClass('active');
			$('.slides_list').css('transform','translateX('+slide/(count+1)*100+'%)');
			activeslide=slide;
		});
		$('.slides_list a').click(function(e){
			e.preventDefault();
		});
	}else{
		var activeslide=0;
		function setdesktopslide(index){
			$('.slides_list').css('transform','translateY(-'+index*$('.slides_list .slide').height()+'px)');
		}
		$('.card__controls .card__control').click(function(){
			count-=$('.slides_list').height()/$('.slides_list .slide').height();
			count=Math.ceil(count);
			if($(this).hasClass('card__control_next'))activeslide++;
			if($(this).hasClass('card__control_prev'))activeslide--;
			if(activeslide<0)activeslide=0;
			if(activeslide>count)activeslide=count;
			setdesktopslide(activeslide);
			
			
		});
		$('.slides_list a').click(function(e){
			
			e.preventDefault();
			$('.slides_list a').removeClass('active');
			$(this).addClass('active');
			if($('.big_image .img').is(':visible')){
				$('.big_image .img').css('background','url('+$(this).attr('href')+') no-repeat center').css('background-size','contain');
			}
		});
		$('.slides_list a').first().click();
	}
});