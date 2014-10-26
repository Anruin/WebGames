/**
 * Created by Anry on 25.10.2014.
 */
console.log('controller.js');
(function(se, paper) {
	se.Controller = function() {
		this.pawn = null;
	};

	se.Controller.prototype.possess = function(_pawn) {
		this.pawn = _pawn;
		_pawn.controller = this;
	}
})(window.se = window.se || {});