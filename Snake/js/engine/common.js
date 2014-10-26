/**
 * Created by Anry on 25.10.2014.
 */
define([
	"../se"
], function (se) {
	console.log('common.js');

	se.Directions = {
		LEFT: new paper.Point(-1, 0),
		UP: new paper.Point(0, -1),
		RIGHT: new paper.Point(1, 0),
		DOWN: new paper.Point(0, 1)
	};

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
	}
})