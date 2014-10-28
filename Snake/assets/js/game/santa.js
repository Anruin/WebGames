/**
 * Created by Anry on 25.10.2014.
 */
define([
	"../se",
	"../helpers/helpers",
	"./sack",
	"../engine/common",
	"../engine/pawn"
], function (se, helpers) {
	console.log('santa.js');
	se.Santa = function() {
		/**
		 * Sack
		 * @type {se.Sack}
		 */
		this.sack = null;
		se.Pawn.call(this);
	};
	se.$extend(se.Santa, se.Pawn);

	se.Santa.prototype.update = function(_dt) {
		se.Pawn.prototype.update.call(this, _dt);
	};
	se.Santa.prototype.turn = function(_params) {
		se.Pawn.prototype.turn.call(this, _params);
	};
})