/**
 * Created by Anry on 25.10.2014.
 */

define([
	"../se"
], function (se) {
	console.log('player.js');
	se.Player = function() {
		this.pawn = null;
	};

	se.Player.prototype.possess = function(_pawn) {
		this.pawn = _pawn;
		_pawn.player = this;
	}
})