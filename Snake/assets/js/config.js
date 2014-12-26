requirejs.config({
	paths: {
		'jquery': './vendor/jquery-1.10.2.min',
		'paper': './vendor/paper-full'
	},
	shim: {
		'paper': {
			exports: 'paper'
		}
	},
	deps: ['paper']
});

require(['app','helpers/helpers','game/config','se','engine/common', "domReady!"], function(app, helpers,  config, se) {
	helpers.addAllImagesToDOM();
	window.isAutoStart = false;
	$('.level-5__btn').click(function(event){
		se.disable_scroll();
		app();
		return false;
	});
	//var debounceComplete = _.debounce(function() {
	//	window.isAutoStart = false;
	//	$('.level-5__btn').trigger("click");
	//}, 500);

	$('#new_game_btn').click(function(event){
		window.isAutoStart = true;
		//$('body,html').stop(true,true).animate({
		//	scrollTop: $('#' + config.levels[0].name).offset().top
		//}, {
		//	duration: config.levels[0].scroll,
		//	complete: debounceComplete
		//});
		$.fn.fullpage.moveTo(5);
	});
});
