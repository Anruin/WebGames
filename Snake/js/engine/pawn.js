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

	/*
	se.Pawn = function(_player) {
		this.player = _player;
		var headGx = {};
		headGx[se.Directions.LEFT] = config.img.pawn.left;
		headGx[se.Directions.UP] = config.img.pawn.up;
		headGx[se.Directions.RIGHT] = config.img.pawn.right;
		headGx[se.Directions.DOWN] = config.img.pawn.down;

		this.head = new se.Actor(Point(0, 0), headGx);
		if (se.Debug) console.log("Pawn created", this);
	};

	se.Pawn.prototype.grow = function() {
		var blockGx = 	{};
		blockGx[se.Directions.LEFT] = config.img.collectibles[0];
		blockGx[se.Directions.UP] = config.img.collectibles[0];
		blockGx[se.Directions.RIGHT] = config.img.collectibles[0];
		blockGx[se.Directions.DOWN] = config.img.collectibles[0];
		this.head.next = new se.Actor(this.head.position, blockGx);
	};

	se.Pawn.prototype.turn = function(dir) {
		this.head.item.image = document.getElementById(this.head.gx[dir].move[0]);
		this.head.turn(dir);
	};

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