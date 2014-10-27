/**
 * Created by Anry on 25.10.2014.
 */

define([
	"../se",
	"../engine/common",
	"./actor"
], function (se) {
	console.log('pawn.js');
	se.Pawn = function() {
		this.controller = null;
		se.Actor.call(this);
	};
	se.$extend(se.Pawn, se.Actor);

	se.Pawn.prototype.update = function(_dt) {
		se.Actor.prototype.update.call(this, _dt);
	};
	/*
	se.Pawn.prototype.update = function(_game, event) {
		this.head.update(event);
		var i, intersectsWithCollectible, intersectsWithObstacle;
		for (i = 0; i < _game.collectibles.length; i++) {
			if (this.head.intersects(_game.collectibles[i].item)) {
				_game.collectibles[i].item.remove();
				_game.collectibles.splice(i, 1);
				this.grow();
				this.player.collected++;
			}
		}
	};
	*/
})