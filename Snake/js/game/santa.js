/**
 * Created by Anry on 25.10.2014.
 */
define([
	"../se",
	"./sack",
	"../engine/common",
	"../engine/pawn"
], function (se) {
	console.log('santa.js');
	se.Santa = function() {
		/**
		 * Sack
		 * @type {se.Sack}
		 */
		this.sack = null;
		se.Pawn.call(this);
		//this.pawn = new se.Pawn();
	};
	se.$extend(se.Santa, se.Pawn);
	//se.Santa.prototype.move = function (_point) {
	//	this.pawn.move(_point);
	//};
	se.Santa.prototype.update = function(_dt) {
		//this.move(this.velocity);
		se.Pawn.prototype.update.call(this, _dt);
	};


})