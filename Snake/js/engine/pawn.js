/**
 * Created by Anry on 25.10.2014.
 */

define([
	"../se",
	"../game/config",
	"../helpers/helpers",
	"../engine/common",
	"./actor"
], function (se, config, helpers) {
	console.log('pawn.js');
	se.Pawn = function() {
		this.controller = null;
		this.follower = null;
		se.Actor.call(this);
	};
	se.$extend(se.Pawn, se.Actor);

	se.Pawn.prototype.update = function(_dt) {
		var follower = this.follower;
		while(follower){
			follower.update(_dt);
			follower = follower.follower;
		}
		se.Actor.prototype.update.call(this, _dt);
	};
	se.Pawn.prototype.addFollower = function(_dt) {
		var newFollower = new se.Pawn();
		newFollower.item = new paper.Raster();
		newFollower.item.position = this.item.position;

		var randomImage = config.img.followers[helpers.randomIndex(config.img.followers)];
		newFollower.item.image = document.getElementById(randomImage);

		newFollower.item.scale(0.7);

		var lastPrimary = this;
		while(lastPrimary.follower){
			lastPrimary = lastPrimary.follower;
		}
		lastPrimary.follower = newFollower;
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