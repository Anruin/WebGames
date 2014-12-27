$(function(){
	//var isFBset = false;
	//var $fbEl = $($('.nav-block-social li').first().find('div').find('span'));
	//var isTWset = false;
	//var $twEl = $('#twitter-widget-0').contents().find("#count");
	//var badInterval = setInterval(function(){
	//	if(!isFBset && $fbEl.length){
	//		$fbEl.text(parseInt($fbEl) + 47);
	//		isFBset = true;
	//	}
	//	if(!isTWset && $twEl.length){
	//		$twEl.text(parseInt($twEl) + 23);
	//		isTWset = true;
	//	}
	//
	//	if(isFBset && isTWset)
	//		clearInterval(badInterval);
	//
	//}, 500);
	if(!$.browser)
		$.browser = {};

	$.browser.device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
});

$(document).ready(function() {
    BackgroundAnimation();
	var padding = '500px';
	$('#game_levels').fullpage({
		paddingBottom: padding,
		scrollingSpeed: 1500,
		resize : false,
		keyboardScrolling: false,
		afterLoad: function(anchorLink, index){
			if(index == 5 && window.isAutoStart){
				$('.level-5__btn').trigger("click");
				window.isAutoStart = false;
			}
			if(window.game && window.game.isToStartLvl){
				window.game.startLevel();
				window.game.setBulbs();
				window.game.isToStartLvl = false;
			}
		},
		afterResize: function(){
			setTimeout(function(){
				if(window.game && window.game.resizeDebounce)
					game.resizeDebounce();
			}, 1000);

		}
	});
	var snowpath = window.en ? "../assets/img/snowfall/flake.png" : "./assets/img/snowfall/flake.png";
	$('.game-level.level-1').css('padding-bottom','0px').snowfall({image :snowpath, minSize: 10, maxSize:32})
			.css({
				'overflow': 'hidden'
			});

    var $light_level = $('.level-4');
    var i;

    var $triggers = $('.level-4__text, .bulb');
    $triggers.on('click', function(){
        $light_level.addClass('light-' + $(this).data('number'));
				$('.level-4__text.text-' + $(this).data('number')).show();
    });
		$('#order').on('click', function(){
			if(!window.game)
				$('#new_game_btn').trigger('click');
			//if(window.game)
			//	game.over("exit");
			//
			//$('html body').animate({
			//	scrollTop: $('#level_6').offset().top
			//}, 1000);
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
		var daysLeft = Math.ceil((targetDate.getTime() - today.getTime()) / millisecondsPerDay);
		var daysLeftString = "" + daysLeft;

		var dayName = "";
		if(en)
			dayName = enducement(daysLeft, "day", "days", "days");
		else
			dayName = enducement(daysLeft, "день", "дня", "дней");

		var $firstDigit = jQuery('.timer__digit:first');
		var $lastDigit = jQuery('.timer__digit:last');
		if (daysLeft < 0) {
			$firstDigit.addClass('digit-0');
			$lastDigit.addClass('digit-0');
		} else {
			var $days = jQuery('span.days > span');
			if (daysLeft == 0) {
				document.write("00");
			} else {
				if(daysLeft > 10)
					$firstDigit.addClass('digit-' + daysLeftString.substr(daysLeftString.length - 2, 1));
				else
					$firstDigit.addClass('digit-0');

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
			console.log(data);
			if(data.status == "success"){
				$('#form_success').show();
				$('#santa_form').data("sent", true);
			}
			else
				$('#form_danger').show();
		},
		error:  function(xhr, str){
			console.log(xhr + str);
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
		console.log('BufferLoader: XHR error');
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
	var names = ["steps", "pit", "bang", "pickup", "give", "win"];
	var BUFFERS_TO_LOAD = {};
	names.map(function(name){
		BUFFERS_TO_LOAD[name] = 'http://game.verstak.ru/assets/sounds/' + name + '.mp3';
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
		if(!buffer)
			return;
		source.buffer = buffer;
		source.connect(window.context.destination);
		if (!source.start)
			source.start = source.noteOn;
		source.start(time);
		return source;
	}
	try {
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		window.context = new AudioContext();
	}
	catch(e) {
		alert("Web Audio API is not supported in this browser");
	}
	loadBuffers();
	window.sound = function(name){
		return playSound(BUFFERS[name], 0) || {};
	};
})
