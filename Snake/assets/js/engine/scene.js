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

		if (se.$debug) console.log('Scene update');

		curScene.actors.map(function(actor){
			actor.update(_dt);
		});

		curScene.pawns.map(function(pawn){
			curScene.collectibles.map(function(obj){
				if(pawn.item.bounds.intersects(obj.item.bounds)){
					obj.item.remove();
					curScene.collectibles.splice(curScene.collectibles.indexOf(obj), 1);

					pawn.score +=1;
					pawn.addSegment();
				}
			});
		});
		if(this.collectibles.length < 2 && this.obstacles.length
				&& this.level.collectibles && this.level.collectibles.length) {
			this.createCollectible();
		}
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
		pawn.item = new paper.Raster();
		pawn.item.scale(config.params.pawn.scale);
		pawn.item.image = document.getElementById(config.img.pawn.down.stand);
		if(config.debug)
			pawn.item.selected = true;
		pawn.animations = helpers.getFramesAnimations("pawn");
		//_player.possess(pawn);
		this.pawns.push(pawn);
		this.actors.push(pawn);
	}

	se.Scene.prototype.createCollectible = function() {
		var collectible = new se.Collectible();
		collectible.item = new paper.Raster();

		var randomImage = this.level.collectibles[helpers.randomIndex(this.level.collectibles)];
		collectible.item.image = document.getElementById(randomImage);
		collectible.item.scale(config.params.collectible.scale);

		if(config.debug)
			collectible.item.selected = true;

		helpers.setNotIntersectRandomPoint(collectible, game.activeScene.actors);
		this.collectibles.push(collectible);
	}
	//TODO: merge with createPawn(merge config)
	se.Scene.prototype.createNPC = function() {
		var npc = new se.NPC();
		npc.item = new paper.Raster();

		var randIndex = helpers.randomIndex(config.params.npc.variant);
		var randomImage = config.params.npc.variant[randIndex].animation[0];
		npc.item.image = document.getElementById(randomImage);
		if(config.debug)
			npc.item.selected = true;

		npc.animations = helpers.getFramesAnimations("npc");
		npc.activeAnimation = npc.animations[randIndex];

		npc.item.scale(config.params.npc.scale);
		helpers.setNotIntersectRandomPoint(npc, game.activeScene.actors);
		this.actors.push(npc);
		this.npc.push(npc);
	}

	se.Scene.prototype.initObstacles = function() {
		var curScene = this;
		if(curScene.obstacles.length){
			curScene.obstacles.map(function(obst){
				curScene.actors.splice(curScene.actors.indexOf(obst), 1);
			})
		}
		curScene.obstacles = [];
		curScene.obstacles.length = 0;

		var obstacles = document.getElementById(curScene.level.name).getElementsByClassName(config.obstacle.class);
		var i = 0;
		while(obstacles[i]){
			var el = obstacles[i].getBoundingClientRect();
			var obst = new se.Obstacle();
			obst.item = new paper.Rectangle(el.left, el.top, el.width, el.height);
			if(config.debug)
				obst.item.selected = true;
			//obst.selected = true;
			curScene.obstacles.push(obst);
			curScene.actors.push(obst);
			i++;
		}
		if(!curScene.obstacles.length)
			curScene.obstacles.length = 1;
	}
})