/**
 * Created by Anry on 25.10.2014.
 */
define([
	"../se",
	"../game/config",
		"../helpers/helpers"
], function (se, config, helpers) {

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

	se.setDebugTools = function () {
		se.debugTools = {};
		se.debugTools.pointText = new paper.PointText(new paper.Point(0, 0));
		se.debugTools.pointText.fillColor = 'black';
		se.debugTools.pointText.visible = false;
		se.debugTools.lastPoints = [];
		se.debugTools.lastPoints.push(se.debugTools.pointText);

		se.debugTools.onKeyDown = function (event) {
			if(event.key == "z" || event.key == "я"){
				config.debug = !config.debug;
			}
		};

		se.debugTools.onMouseMove = function (event) {
			if(config.debug) {
				se.debugTools.pointText.point = event.point;
				var percent = helpers.getPointPercent(event.point);
				se.debugTools.pointText.content = event.point.toString()
					+ "; {x: " + helpers.toDigits(percent.x) + "%, y: " + helpers.toDigits(percent.y) + "%}";
			}
		};
		se.debugTools.onMouseDown = function (event) {
			if(config.debug) {
				se.debugTools.pointText = new paper.PointText(event.point);
				se.debugTools.pointText.fillColor = 'black';
				se.debugTools.pointText.visible = config.debug;
				se.debugTools.lastPoints.push(se.debugTools.pointText);
			}
		};
	}
	se.updateDebugTools = function () {
		se.debugTools.lastPoints.map(function(el){
			el.visible = config.debug;
			el.selected = config.debug;
			el.bringToFront();
		});
	}
});