/**
 * Created by Anry on 25.10.2014.
 */
define([
	"../se",
	"../engine/common",
	"../engine/actor"
], function (se) {
	se.Collectible = function () {
		se.Actor.call(this);
	};
	se.$extend(se.Collectible, se.Actor);

	se.Collectible.prototype.update = function(_dt) {

		se.Actor.prototype.update.call(this, _dt);
	};
})