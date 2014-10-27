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
		this.score = 0;
		this.controller = null;
		this.path = null;
		this.followers = [];
		this.turns = [];
		se.Actor.call(this);
	};
	se.$extend(se.Pawn, se.Actor);

	se.Pawn.prototype.move = function(_dt) {
		if(this.path) {
			this.path.firstSegment.point = this.item.position;
			for (var i = 0; i < this.path.segments.length - 1; i++) {
				var segment = this.path.segments[i];
				var nextSegment = segment.next;
				var vector = new paper.Point([segment.point.x - nextSegment.point.x,
					segment.point.y - nextSegment.point.y]);
				vector.length = 100;
				nextSegment.point = [segment.point.x - vector.x,
					segment.point.y - vector.y];

				this.followers[i].item.position = nextSegment.point;
			}
			this.path.smooth();
		}

		se.Actor.prototype.move.call(this, _dt);
	};

	se.Pawn.prototype.update = function(_dt) {
		se.Actor.prototype.update.call(this, _dt);
	};
	se.Pawn.prototype.turn = function(_dt) {
		se.Actor.prototype.turn.call(this, _dt);
	};
	se.Pawn.prototype.addSegment = function(_dt) {
		if(!this.path){
			this.path = new paper.Path({
				strokeColor: '#6d6d6d',
				strokeWidth: 5
			});
			this.path.add(this.item.position);
		}
		var segment = new se.Pawn();
		segment.item = new paper.Raster();

		var position = [this.path.lastSegment.point.x - this.velocity.x * 5,
			this.path.lastSegment.point.y - this.velocity.y * 5];

		this.path.add(position);
		segment.item.position = this.path.lastSegment.point;

		var randomImage = config.img.followers[helpers.randomIndex(config.img.followers)];
		segment.item.image = document.getElementById(randomImage);

		segment.item.scale(0.7);
		this.followers.push(segment);
		game.activeScene.actors.push(segment);
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