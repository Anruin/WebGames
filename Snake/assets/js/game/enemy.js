/**
 * Created by Eugene on 31.10.2014.
 */
define([
	"../se",
	"../game/config",
	"../helpers/helpers",
	"../engine/common",
	"../engine/actor"
], function (se, config, helpers) {
	se.Enemy = function() {
		se.Actor.call(this);
	};
	se.$extend(se.Enemy, se.Actor);

	se.Enemy.prototype.update = function(_dt) {
		se.Actor.prototype.update.call(this, _dt);
	};
})
