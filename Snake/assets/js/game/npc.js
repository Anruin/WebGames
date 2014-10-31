/**
 * Created by Eugene on 31.10.2014.
 */
define([
	"../se",
	"../helpers/helpers",
	"./sack",
	"../engine/common",
	"../engine/actor"
], function (se, helpers) {
	se.NPC = function() {
		/**
		 * Sack
		 * @type {se.Sack}
		 */
		se.NPC.call(this);
	};
	se.$extend(se.NPC, se.Actor);

	se.NPC.prototype.update = function(_dt) {
		if(game.activeScene.mainPawn.item.bounds.intersects(this.item.bounds))
			this.activeAnimation = this.animations[helpers.randomIndex(this.animations)];

		se.Actor.prototype.update.call(this, _dt);
	};
})
