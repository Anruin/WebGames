/**
 * Created by Anry on 25.10.2014.
 */
define([
	"../se",
	"../engine/common",
	"../engine/actor"
], function (se) {
	console.log('collectible.js');
	se.Collectible = function () {
	};
	se.$extend(se.Collectible, se.Actor);

	se.Actor.prototype.update = function(_dt) {

		se.Actor.prototype.update.call(this, _dt);
	};
})