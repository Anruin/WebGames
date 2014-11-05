/**
 * Created by Eugene on 31.10.2014.
 */
define([
	"../se",
	"../game/config",
	"../helpers/helpers",
	"../engine/common",
	"../engine/pawn"
], function (se, config, helpers) {
	se.Enemy = function() {
		se.Pawn.call(this);
	};
	se.$extend(se.Enemy, se.Pawn);

	se.Enemy.prototype.update = function(_dt) {
		se.Pawn.prototype.update.call(this, _dt);
	};
})
