requirejs.config({
	paths: {
		'jquery': './vendor/jquery-1.10.2.min',
		'paper': './vendor/paper-full',
		'config': './game/config'
	},
	shim: {
		'paper': {
			exports: 'paper'
		},
		'config': {
			exports: 'config'
		}
	},
	deps: ['paper', 'config']
});

require(['app'], function(app) {
    app();
});
