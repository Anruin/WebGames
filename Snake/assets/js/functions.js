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


	function daysLeftNewYear(en) {
		var today = new Date();
		var targetDate = new Date("December 31, "+today.getFullYear());
		var millisecondsPerDay = 24*60*60*1000;
		var daysLeft = Math.round((targetDate.getTime() - today.getTime()) / millisecondsPerDay);
		var dayName = "";
		var daysLeftString = "" + daysLeft;
		var daysLeftLastDigit = parseInt(daysLeftString.substr(daysLeftString.length - 1));
		if (daysLeft > 4 && daysLeft < 21) {
			dayName = en ? "days" : " дней";
		} else {
			if (daysLeftLastDigit == 1) {
				dayName = en ? "day" : " день";
			} else {
				if (daysLeftLastDigit >= 2 || daysLeftLastDigit <= 4) {
					dayName = en ? "days" : " дня";
				} else {
					dayName = en ? "days" : " дней";
				}
			}
		}
		if (daysLeft < 0) {
			$firstDigit.addClass('digit-0');
			$lastDigit.addClass('digit-0');
		} else {
			var $firstDigit = jQuery('.timer__digit:first');
			var $lastDigit = jQuery('.timer__digit:last');
			var $days = jQuery('span.days > span');
			if (daysLeft == 0) {
				document.write("00");
			} else {
				$firstDigit.addClass('digit-' + daysLeftString.substr(daysLeftString.length - 2, 1));
				$lastDigit.addClass('digit-' + daysLeftString.substr(daysLeftString.length - 1));
				$days.html(dayName);
			}
		}
	}

	daysLeftNewYear(window.en);
});