$(function(){

});

$(document).ready(function() {
    BackgroundAnimation();
	var snowpath = window.en ? "../assets/img/snowfall/flake.png" : "./assets/img/snowfall/flake.png";
	$('.game-level.level-1').snowfall({image :snowpath, minSize: 10, maxSize:32}).css('overflow', 'hidden');

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

function BufferLoader(context, urlList, callback) {
	this.context = context;
	this.urlList = urlList;
	this.onload = callback;
	this.bufferList = new Array();
	this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = function(url, index) {
	var request = new XMLHttpRequest();
	request.open("GET", url, true);
	request.responseType = "arraybuffer";
	var loader = this;
	request.onload = function() {
		loader.context.decodeAudioData(
				request.response,
				function(buffer) {
					if (!buffer) {
						alert('error decoding file data: ' + url);
						return;
					}
					loader.bufferList[index] = buffer;
					if (++loader.loadCount == loader.urlList.length)
						loader.onload(loader.bufferList);
				},
				function(error) {
					console.error('decodeAudioData error', error);
				}
		);
	}
	request.onerror = function() {
		alert('BufferLoader: XHR error');
	}
	request.send();
}

BufferLoader.prototype.load = function() {
	for (var i = 0; i < this.urlList.length; ++i)
		this.loadBuffer(this.urlList[i], i);
}

$(function() {
	var BUFFERS = {};
	var context = null;
	var names = ["steps", "pit", "bang", "pickUp", "give"];
	var BUFFERS_TO_LOAD = {};
	names.map(function(name){
		BUFFERS_TO_LOAD[name] = 'http://games.narleyn.ru/Snake/assets/sounds/' + name + '.mp3';
	});

	function loadBuffers() {
		var names = [];
		var paths = [];
		for (var name in BUFFERS_TO_LOAD) {
			var path = BUFFERS_TO_LOAD[name];
			names.push(name);
			paths.push(path);
		}
		var bufferLoader = new BufferLoader(window.context, paths, function (bufferList) {
			for (var i = 0; i < bufferList.length; i++) {
				var buffer = bufferList[i];
				var name = names[i];
				BUFFERS[name] = buffer;
			}
		});
		bufferLoader.load();
	}
	function playSound(buffer, time) {
		var source = window.context.createBufferSource();
		source.buffer = buffer;
		source.connect(window.context.destination);
		if (!source.start)
			source.start = source.noteOn;
		source.start(time);
	}
	try {
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		window.context = new AudioContext();
	}
	catch(e) {
		alert("Web Audio API is not supported in this browser");
	}
	loadBuffers();
	$('.level-3__advantage.adv-1').click(function(){
		playSound(BUFFERS.steps, 0);
	});
	$('.level-3__advantage.adv-2').click(function(){
		playSound(BUFFERS.pit, 0);
	});
	$('.level-3__advantage.adv-3').click(function(){
		playSound(BUFFERS.bang, 0);
	});
	$('.level-3__advantage.adv-4').click(function(){
		playSound(BUFFERS.pickUp, 0);
	});
})