/**
 * Created by Anry on 25.10.2014.
 */
console.log('common.js');

(function(se, paper) {
	se.$debug = false;

	se.$extend = function(_childClass, _baseClass) {
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
})(window.se = window.se || {});