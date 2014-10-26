/**
 * Created by Anry on 25.10.2014.
 */
define([
	"../se",
	"../engine/common",
	"../engine/actor"
], function (se) {
	console.log('sack.js');
	se.Sack = function() {
		/**
		 * Sack
		 * @type {se.Sack}
		 */
		this.next = null;
	}
	se.$extend(se.Sack, se.Actor);

	se.Sack.prototype.update = function() {
		this.move(this.velocity);
		se.Actor.prototype.update.call(this);
	}
})