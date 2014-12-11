$(function(){

});

$(document).ready(function() {
    BackgroundAnimation();
	
	$('.game-level.level-1').snowfall({image :"assets/img/snowfall/flake.png", minSize: 10, maxSize:32}).css('overflow', 'hidden');

    var $light_level = $('.level-4');
    var i;

    var $triggers = $('.level-4__text, .bulb');
    $triggers.on('click', function(){
        $light_level.addClass('light-' + $(this).data('number'));
    });
		$('#order').on('click', function(){
			if(window.game)
				game.over("exit");

			$('html body').animate({
				scrollTop: $('#level_6').offset().top
			}, 1000);
		});

	function enducement(num, one, two, five){
		num = Math.abs(num);
		num %= 100;
		if ( (num >= 5) && (num <= 20) ) {
			return five;
		}
		num %= 10;
		if (num == 1) {
			return one;
		}
		if ( (num >= 2) && (num <= 4) ) {
			return two;
		}
		return five;
	}
	function daysLeftNewYear(en) {
		var today = new Date();
		var targetDate = new Date("December 31, "+today.getFullYear());
		var millisecondsPerDay = 24*60*60*1000;
		var daysLeft = Math.round((targetDate.getTime() - today.getTime()) / millisecondsPerDay);
		var daysLeftString = "" + daysLeft;

		var dayName = "";
		if(en)
			dayName = enducement(daysLeft, "day", "days", "days");
		else
			dayName = enducement(daysLeft, "день", "дня", "дней");

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
	$('#form_success').hide();
	$('#form_danger').hide();
	$('#form_error').hide();
	$('#form_already').hide();
});
function send() {
	$('#form_success').hide();
	$('#form_danger').hide();
	$('#form_error').hide();
	$('#form_already').hide();

	if($('#santa_form').data("sent")){
		$('#form_already').show();
		return;
	}

	var msg = $('#santa_form').serialize();
	$.ajax({
		type: 'POST',
		url: 'order.php',
		data: msg,
		success: function(data) {
			if(data.status == "success"){
				$('#form_success').show();
				$('#santa_form').data("sent", true);
			}
			else
				$('#form_danger').show();
		},
		error:  function(xhr, str){
			$('#form_error').show();
		}
	});
}