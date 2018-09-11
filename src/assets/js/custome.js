document.addEventListener("DOMContentLoaded", function () {

   $(".Hamburger").click(function () {
        $(".Hamburger").toggleClass("open");
        $("body").toggleClass("over");
       if ($(".Hamburger").has("open")) {
           $(".notification").toggleClass("none");
       }
    });
    $(".notification").click(function () {
        $("body").toggleClass("over");
        $(".notification").toggleClass("open");
        if ( $(".notification").has("open")){
            $(".Hamburger").toggleClass("none");
        }
    });

    $(window).scroll(function () {
        var hT = $('.Parallax').offset().top,
            hH = $('.Parallax').outerHeight(),
            wH = $(window).height(),
            wS = $(this).scrollTop();
        if (wS > (hT + hH - wH)) {
            TweenLite.defaultEase = Linear.easeNone;

            //show the square only once js has run
            //visibility set to hidden in css panel
            TweenLite.set(".transparent-box", { visibility: "visible" });

            var tl = new TimelineLite();
            tl.fromTo(".l1", 1, { height: 0 }, { height: '100%' })
            .fromTo(".l2", 4, { width: 0, backgroundColor: "#fff" }, { width: '100%', backgroundColor: "#fff" })
            .fromTo(".l3", 1, { height: 0 }, { height: '100%' })
            .fromTo(".l4", 1, { width: 0 }, { width: '100%' })

            tl.timeScale(6) //play faster
            $(window).off('scroll');
        }
    });
  
  
           
    
  
});




