/**
 * Created by Anry on 25.10.2014.
 */
define([
	"../se",
	"../game/config",
	"../helpers/helpers",
	"./actor",
	"./pawn",
	"../game/gift"
], function (se, config, helpers) {
	/**
	 * Scene constructor
	 * @param _game
	 * @constructor
	 */
	se.Scene = function(_game) {
		this.pawns = [];
		this.actors = [];
		this.collectibles = [];
		this.obstacles = [];

	};
	se.Scene.prototype.pawns = [];
	se.Scene.prototype.collectibles = [];
	/**
	 * Update frame
	 * @param _dt delta time
	 */
	se.Scene.prototype.update = function (_dt) {
		var curScene = this;

		if (se.$debug) console.log('Scene update');

		curScene.actors.map(function(actor){
			actor.update(_dt);
		});

		curScene.pawns.map(function(pawn){
			pawn.update(_dt);

			curScene.collectibles.map(function(obj){
				if(pawn.intersects(obj)){
					obj.item.remove();
					curScene.collectibles.splice(curScene.collectibles.indexOf(obj), 1);

					pawn.score +=1;
					pawn.addSegment();
				}
			});

			while(curScene.collectibles.length < 2){
				curScene.createGift();
			}
		});
	};

	/**
	 * Create new actor
	 */
	se.Scene.prototype.createActor = function () {
		var actor = new se.Actor();
		this.actors.push(actor);
		return actor;
	};
	se.Scene.prototype.pawn = null;
	/**
	 * Create new pawn and possess by player
	 * @param _player
	 */
	se.Scene.prototype.createPawn = function(_player) {
		var pawn = new se.Pawn();
		_player.possess(pawn);
		this.pawns.push(pawn);
	}
	se.Scene.prototype.initObstacles = function() {
		var obstacles = document.getElementsByClassName(config.obstacle.class);
		var i = 0;
		while(obstacles[i]){
			var el = obstacles[i].getBoundingClientRect();
			var rect = new paper.Rectangle(el.left, el.top, el.width, el.height);
			this.obstacles.push(rect);
			i++;
		}
	}
	se.Scene.prototype.createGift = function() {
		var gift = new se.Gift();
		gift.item = new paper.Raster();

		var randomImage = config.img.collectibles[helpers.randomIndex(config.img.collectibles)];
		gift.item.image = document.getElementById(randomImage);
		gift.item.scale(config.params.collectible.scale);

		helpers.setNotIntersectRandomPoint(gift, game.activeScene.actors);
		this.collectibles.push(gift);
	}
})