@@include('./lib/jquery.fancybox.min.js')
@@include('./lib/slider.js')

$(document).ready(function(){
    
// mobile_menu
    
    $('.burger').click( function() { 
        $('.menu-line .menu').slideToggle(300);
        $('.burger').toggleClass( 'burger_active' ); 
    });

// sub-menu 
    
    $('.menu li.menu-item-has-children>a').click(function(e){
		e.preventDefault();
		if(window.innerWidth>1279)return ;
		$('.sub-menu').not($(this).closest('li').find('.sub-menu')).slideUp('300');
		$(this).closest('li').find('.sub-menu').slideToggle('300');
    }); 
    
    $('.menu li.sub-menu-item-has-children>a').click(function(e){
        e.preventDefault();
		if(window.innerWidth>1279)return ;
        $('.sub-menu ul').not($(this).closest('li').find(' ul')).slideUp('300');	$(this).closest('li').find('ul:first').slideToggle('300');
    }); 
    
    $('.menu li.small-sub-menu-item-has-children>a').click(function(e){
        e.preventDefault();
		if(window.innerWidth>1279)return ;
        $('.sub-menu ul').not($(this).closest('li').find(' ul')).not($(this).closest('li').closest('ul')).slideUp('300');	$(this).closest('li').find('ul:first').slideToggle('300');
    });
}); 