/**
 * Created by Anry on 25.10.2014.
 */
console.log('common.js');
(function(se, paper) {
	se.EXTEND = function(_childClass, _baseClass) {
		_childClass.prototype = new _baseClass();
		_childClass.prototype.constructor = _childClass;
	}
})(window.se = window.se || {});