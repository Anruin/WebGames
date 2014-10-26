/**
 * Created by Anry on 25.10.2014.
 */
console.log('player.js');
(function(se, paper) {
	se.Player = function() {
		this.pawn = null;
	};

	se.Player.prototype.possess = function(_pawn) {
		this.pawn = _pawn;
		_pawn.player = this;
	}
})(window.se = window.se || {});