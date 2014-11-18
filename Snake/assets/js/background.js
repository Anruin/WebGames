/**
 * Скрипт параллакса для фона
 * Для работы требуется плагин ScrollMagic (http://plugins.jquery.com/ScrollMagic/)
 */

(function($, window) {

    "use strict";

    window.BackgroundAnimation = function () {

        var BackgroundAnimation = this;

        var construct = function () {

            // make a variable to store the window height.
            var windowHeight = $(window).innerHeight();
            // function to be used to retrieve variable
            function getWindowHeight() {
                return windowHeight;
            }
		
			function initBackground(){
				var controller = new ScrollMagic();
			
				// with scene reset
				controller = controller.destroy(true);
				controller = new ScrollMagic();
				
				var tween1, tween2, tween3, tween4, tween5, scene1, scene2, scene3, scene4, scene5;

				tween1 = TweenMax.fromTo("#game_background", 3.5,
					{"top": "-100%"},
					{"top": "-1100%",
					ease: Linear.easeNone, 
					immediateRender:false
					}
				);
				
				scene1 = new ScrollScene({triggerElement: "#game_levels", offset: getWindowHeight() / 2 - 1, duration: getWindowHeight() * 5 })
					.setTween(tween1)
					.addTo(controller);
			}

			initBackground();
			
            // update window height on resize
            $(window).on("resize", function () {
                windowHeight = $(window).innerHeight();
				initBackground();
            });

            
        };

        // INIT
        construct();
        return BackgroundAnimation;
    };

})(jQuery, window);