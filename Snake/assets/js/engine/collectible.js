/**
 * Created by Anry on 25.10.2014.
 */
define([
	"../se",
	"../engine/common",
	"../engine/actor"
], function (se) {
	// Collectible is actor that can be 'collected' by pawn
	se.Collectible = function () {
		se.Actor.call(this);
	};

	// Implements se.Actor class
	se.$extend(se.Collectible, se.Actor);

	se.Collectible.prototype.update = function(_dt) {
		// Call base class function
		se.Actor.prototype.update.call(this, _dt);
	};
});