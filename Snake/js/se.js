/**
 * Created by Eugene on 26.10.2014.
 */
define( function (require) {
	var singleton = function () {
		return window.se = window.se || {};
	};
	return singleton();
})