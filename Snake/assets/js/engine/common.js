/**
 * Created by Anry on 25.10.2014.
 */
define([
	"../se"
], function (se) {

	se.$debug = false;

	se.$extend = function (_childClass, _baseClass) {
		var originalPrototype = _childClass.prototype;
		_childClass.prototype = Object.create(_baseClass.prototype);
		// Merge original and new prototypes
		for (var key in originalPrototype) {
			if (originalPrototype.hasOwnProperty(key)) {
				_childClass.prototype[key] = originalPrototype[key];
			}
		}
		_childClass.prototype.constructor = _childClass;
	};

	var keys = [33, 34, 37, 38, 39, 40];

	function preventDefault(e) {
		e = e || window.event;
		if (e.preventDefault)
			e.preventDefault();
		e.returnValue = false;
	}

	function keydown(e) {
		for (var i = keys.length; i--;) {
			if (e.keyCode === keys[i]) {
				preventDefault(e);
				return;
			}
		}
	}

	function wheel(e) {
		preventDefault(e);
	}

	se.disable_scroll = function () {
		if (window.addEventListener) {
			window.addEventListener('DOMMouseScroll', wheel, false);
		}
		window.onmousewheel = document.onmousewheel = wheel;
		document.onkeydown = keydown;
	};

	se.enable_scroll = function () {
		if (window.removeEventListener) {
			window.removeEventListener('DOMMouseScroll', wheel, false);
		}
		window.onmousewheel = document.onmousewheel = document.onkeydown = null;
	};
});