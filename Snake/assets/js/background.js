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

            // update window height on resize
            $(window).on("resize", function () {
                windowHeight = $(window).innerHeight();
            });



            var controller = new ScrollMagic();
            var tween1, tween2, tween3, tween4, tween5, scene1, scene2, scene3, scene4, scene5;


            tween1 = TweenMax.fromTo("#game_background", 0.2,
                {"top": "-100%", "width": "100%"},
                {"top": "-290%", "width": "120%"},
                {ease: Linear.easeNone}
            );
            tween2 = TweenMax.fromTo("#game_background", 0.2,
                {"top": "-290%", "width": "120%"},
                {"top": "-493%", "width": "100%"},
                {ease: Linear.easeNone}
            );
            tween3 = TweenMax.fromTo("#game_background", 0.2,
                {"top": "-493%"},
                {"top": "-685%"},
                {ease: Linear.easeNone}
            );
            tween4 = TweenMax.fromTo("#game_background", 0.2,
                {"top": "-685%"},
                {"top": "-890%"},
                {ease: Linear.easeNone}
            );
            tween5 = TweenMax.fromTo("#game_background", 0.2,
                {"top": "-890%"},
                {"top": "-1100%"},
                {ease: Linear.easeNone}
            );

            // build scene
            scene5 = new ScrollScene({triggerElement: "#game_levels", offset: getWindowHeight() * 4 + getWindowHeight() / 2, duration: getWindowHeight() })
                .setTween(tween5)
                .addTo(controller);

            // build scene
            scene4 = new ScrollScene({triggerElement: "#game_levels", offset: getWindowHeight() * 3 + getWindowHeight() / 2, duration: getWindowHeight() })
                .setTween(tween4)
                .addTo(controller);

            // build scene
            scene3 = new ScrollScene({triggerElement: "#game_levels", offset: getWindowHeight() * 2 + getWindowHeight() / 2, duration: getWindowHeight() })
                .setTween(tween3)
                .addTo(controller);

            // build scene
            scene2 = new ScrollScene({triggerElement: "#game_levels", offset: getWindowHeight() + getWindowHeight() / 2, duration: getWindowHeight() })
                .setTween(tween2)
                .addTo(controller);

            // build scene
            scene1 = new ScrollScene({triggerElement: "#game_levels", offset: getWindowHeight() / 2 - 1, duration: getWindowHeight() })
                .setTween(tween1)
                .addTo(controller);

            // show indicators (requires debug extension)
            //scene1.addIndicators({zindex: 1000});
            //scene2.addIndicators({zindex: 1000});
            //scene3.addIndicators({zindex: 1000});
            //scene4.addIndicators({zindex: 1000});
            //scene5.addIndicators({zindex: 1000});
        };

        // INIT
        construct();
        return BackgroundAnimation;
    };

})(jQuery, window);