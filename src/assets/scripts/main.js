// govmu.org


$(document).ready(function(){
	// Burger Menu Effect
	"use strict";
	 var offsetY = window.pageYOffset;
	$('.my-navbar-button').click(function(){		
		$(".menu-container").toggleClass("active");
		$('#mynav-icon').toggleClass('open');
		 offsetY = window.pageYOffset;
		if($('.menu-container').hasClass('active')){
			  $('body').addClass("fixedPosition");
			   $('.my-navbar-button').addClass("active");
			  //$('.content-overlay').stop(true,true).fadeTo(200, 0.8);
			  $("#mynav-item").text("Close");
			   } else {
			  $('body').removeClass("fixedPosition");
			   $('.my-navbar-button').removeClass("active");
			  //$('.content-overlay').stop(true,true).fadeTo(200, 0);
			  //$('.content-overlay').css('display','none');
			  $("#mynav-item").text("Ministries");
		   }
		
	});

	//Font Increase
	var curFontSize= localStorage["FontSize"];
    if (curFontSize){
        //set to previously saved fontsize if available
         $('.easyreader').css('font-size', curFontSize);
    }
    
    $(".increaseFont,.decreaseFont").click(function () {
        var type = $(this).val();
        curFontSize = $('.easyreader').css('font-size'); 
       // if () {
        if (type == 'increase') {
            $('.easyreader').css('font-size', parseInt(curFontSize) + 2 + "px");
        } else {
            $('.easyreader').css('font-size', parseInt(curFontSize) - 2 + "px");
        }
        localStorage.setItem('FontSize', curFontSize);
    });
    
    var resetFont = $('.easyreader').css('font-size'); 
    $(".reset").click(function () {
       	$('.easyreader').css('font-size', resetFont);
    });
	
	
	
	
	// Slick on Homepage
	$('.information-slider').each(function () {
		$(this).slick({
			centerMode: true,
			centerPadding: '0',
			slidesToShow: 5,
			infinite: true,
			dots: true,
			autoplay: true,
  			autoplaySpeed: 1500,
			arrows: true,
			responsive: [
				{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3
					
				}
			},
				{
				breakpoint:719,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
				{
					breakpoint: 500,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
			}
			]
		});
	});


		$('.slick-feature').slick({
			slidesToShow: 5,
			infinite: true,
			arrows: true,
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 3

					}
				},
				{
					breakpoint: 1023,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 1,
						dots: true,
						arrows: false,
					}
				},
				{
					breakpoint: 979,
					settings: {
						slidesToShow:2,
						slidesToScroll: 1,
						dots: true,
						arrows: false,
					}
				},
				{
					breakpoint: 719,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1,
						dots: true,
						arrows: false,
					}
				},
				{
					breakpoint: 500,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						dots: true,
						arrows: false,
					}
				}
			]
		});

	
});

// Scroll Effect on Header
$(document).scroll(function() {
	  "use strict";
		  var y = $(this).scrollTop();
		  if (y > 350) {
			$('header').addClass('scrolled');
			$('.logo').addClass('smaller');
			$('.btn-momoris').addClass('scrolled');
		  } else {
			$('header').removeClass('scrolled');
			$('.logo').removeClass('smaller');
			$('.btn-momoris').removeClass('scrolled');
		  }
		});

// MENU DROPDOWN		
;(function( $, window, document, undefined )
{
	$.fn.doubleTapToGo = function( params )
	{
		if( !( 'ontouchstart' in window ) &&
			!navigator.msMaxTouchPoints &&
			!navigator.userAgent.toLowerCase().match( /windows phone os 7/i ) ) return false;
		this.each( function()
		{
			var curItem = false;
			$( this ).on( 'click', function( e )
			{
				var item = $( this );
				if( item[ 0 ] != curItem[ 0 ] )
				{
					e.preventDefault();
					curItem = item;
				}
			});
			$( document ).on( 'click touchstart MSPointerDown', function( e )
			{
				var resetItem = true,
					parents	  = $( e.target ).parents();
				for( var i = 0; i < parents.length; i++ )
					if( parents[ i ] == curItem[ 0 ] )
						resetItem = false;
				if( resetItem )
					curItem = false;
			});
		});
		return this;
	};
})( jQuery, window, document );
$( '#nav li:has(ul)' ).doubleTapToGo();	