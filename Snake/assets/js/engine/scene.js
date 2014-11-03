/**
 * Created by Anry on 25.10.2014.
 */
define([
	"../se",
	"../game/config",
	"../helpers/helpers",
	"./actor",
	"./pawn",
	"../game/gift",
	"../game/obstacle",
	"../game/npc"
], function (se, config, helpers) {
	/**
	 * Scene constructor
	 * @param _game
	 * @constructor
	 */
	se.Scene = function(_game) {
		this.pawns = [];
		this.enemies = [];
		this.actors = [];
		this.collectibles = [];
		this.npc = [];
		this.obstacles = [];
		this.mainPawn = null;
		this.level= null;
	};
	se.Scene.prototype.pawns = [];
	se.Scene.prototype.collectibles = [];
	/**
	 * Update frame
	 * @param _dt delta time
	 */
	se.Scene.prototype.update = function (_dt) {
		var curScene = this;

		curScene.actors.map(function(actor){
			actor.update(_dt);
		});

		curScene.pawns.map(function(pawn){
			curScene.collectibles.map(function(obj){
				if(pawn.item.bounds.intersects(obj.item.bounds)){
					obj.item.remove();

					curScene.collectibles.splice(curScene.collectibles.indexOf(obj), 1);
					curScene.actors.splice(curScene.actors.indexOf(obj), 1);

					pawn.score += config.params.collectible.score;
					pawn.addSegment();
				}
			});
		});
		if(curScene.prepared && helpers.isForAddToScene(curScene.level, config.params.collectible,
						curScene.collectibles, curScene.mainPawn.score)) {
			curScene.createActor("collectible", this.collectibles, "normal");
		}
		//if(curScene.prepared && helpers.isForAddToScene(curScene.level, config.params.collectible,
		//				curScene.enemies, curScene.mainPawn.lifes)) {
		//	curScene.createActor("enemy", this.enemies, "animation", true);
		//}
	};

	/**
	 * Create new actor
	 */
	se.Scene.prototype.createActor = function(name, array, image, isAnimation) {
		//TODO: take image, isAnimation and future params from config.params[name] props
		var actor = new se[helpers.uppercaseFirstChar(name)]();
		actor.item = new paper.Raster();

		var randIndex = helpers.randomIndex(config.params[name].img);
		var randomImage = config.params[name].img[randIndex][image][0];
		actor.item.image = document.getElementById(randomImage);

		if(isAnimation) {
			actor.animations = helpers.getFramesAnimations(name);
			actor.activeAnimation = actor.animations[randIndex];
		}

		actor.status = "wait";

		actor.item.scale(config.params[name].scale);
		helpers.setNotIntersectRandomPoint(actor, game.activeScene.actors);
		array.push(actor);
		this.actors.push(actor);
	};
	/**
	 * Create new pawn and possess by player
	 * @param _player
	 */
	se.Scene.prototype.createPawn = function(_player) {
		var pawn = new se.Pawn();
		pawn.item = new paper.Raster();
		pawn.item.scale(config.params.pawn.scale);
		pawn.item.image = document.getElementById(config.params.pawn.img.down.stand);

		pawn.animations = helpers.getFramesAnimations("pawn");
		//_player.possess(pawn);
		this.pawns.push(pawn);
		this.actors.push(pawn);
	};

	se.Scene.prototype.initObstacles = function() {
		var curScene = this;
		if(curScene.obstacles.length){
			curScene.obstacles.map(function(obst){
				curScene.actors.splice(curScene.actors.indexOf(obst), 1);
				obst.item.remove();
			})
		}
		curScene.obstacles = [];

		var domObstacles = document.getElementById(curScene.level.name).getElementsByClassName(config.obstacle.class);
		var i = 0;
		while(domObstacles[i]){
			var el = domObstacles[i].getBoundingClientRect();
			var obst = new se.Obstacle();
			var rect = new paper.Rectangle(el.left, el.top, el.width, el.height);
			obst.item = new paper.Path.Rectangle(rect);
			curScene.obstacles.push(obst);
			curScene.actors.push(obst);
			i++;
		}
	}
});