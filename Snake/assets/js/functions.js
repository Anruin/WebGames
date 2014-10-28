$(function(){

});

$(document).ready(function() {
    BackgroundAnimation();

    var $light_level = $('.level-4');
    var i;

    var $triggers = $('.level-4__text');
    $triggers.on('click', function(){
        var light_number = $(this).index() + 1;
        $light_level.addClass('light-' + light_number);
    });

});