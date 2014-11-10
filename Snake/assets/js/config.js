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

require(['app','helpers/helpers','se','engine/common', "domReady!"], function(app, helpers, se) {
	helpers.addAllImagesToDOM();
	$('.level-5__btn').click(function(event){
		se.disable_scroll();
		app();
		return false;
	});
});
