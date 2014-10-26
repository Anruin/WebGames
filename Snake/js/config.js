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

require(['app'], function(app) {
    app();
});
