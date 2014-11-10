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
	"../game/npc",
	"../game/enemy"
], function (se, config, helpers) {
	/**
	 * Scene constructor
	 * @param _game
	 * @constructor
	 */
	se.Scene = function() {
		this.pawns = [];
		this.enemies = [];
		this.actors = [];
		this.collectibles = [];
		this.npc = [];
		this.obstacles = [];
		this.toRemove = [];
		this.mainPawn = null;
		this.level = null;
		this.lives = null;
		this.nums = {};
		//temporary:
		this.bulbs = [];
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

		curScene.enemies.map(function(enemy){
			enemy.update(_dt);
		});

		curScene.pawns.map(function(pawn){
			curScene.collectibles.map(function(obj){
				if(pawn.item.bounds.intersects(obj.item.bounds)){
					obj.item.remove();

					curScene.collectibles.splice(curScene.collectibles.indexOf(obj), 1);
					curScene.actors.splice(curScene.actors.indexOf(obj), 1);

					pawn.score += config.params.collectible.general.give.score;
					pawn.lifes += config.params.collectible.general.give.lives;
					pawn.addSegment();
				}
			});
			curScene.enemies.map(function(obj){
				if((obj.command == "move" || obj.command == "idle") && pawn.item.bounds.intersects(obj.item.bounds)){
					if(obj.curState.name == "move")
						obj.setState("active", "active");

					//if(obj.name == "bomb"){
					//	curScene.enemies.splice(curScene.enemies.indexOf(obj), 1);
					//	curScene.toRemove.push(obj);
					//}
					//else if(obj.name == "pit"){
					//	var intervalID = setInterval(function(){
					//		if(!pawn.item.bounds.intersects(obj.item.bounds)){
					//			obj.command = "idle";
					//			clearInterval(intervalID);
					//		}
					//	}, 200);
					//}

					//TODO: move this to helpers function
					pawn.score -= config.params.enemy.general.take.score;
					pawn.lives -= config.params.enemy.general.take.lives;
					helpers.initLives();

					if(pawn.lives < 0){
						game.over(true);
						return;
					}

					for(var i = 0; i < config.params.enemy.general.take.score; i++){
						pawn.removeSegment(0);
						curScene.createActor("collectible", curScene.collectibles);
					}
				}
			});
		});
		if(curScene.prepared && helpers.isForAddToScene(curScene.level, "collectible",
						curScene.collectibles, curScene.mainPawn.score)) {
			curScene.createActor("collectible", curScene.collectibles);
		}
		if(curScene.prepared && helpers.isForAddToScene(curScene.level, "enemy",
						curScene.enemies)) {
			curScene.createActor("enemy", curScene.enemies);
		}
	};

	/**
	 * Create new actor
	 */
	se.Scene.prototype.createActor = function(_name, _array, _variant) {
		if(!this.nums[_name])
			this.nums[_name] = 0;

		var actor = new se[helpers.uppercaseFirstChar(_name)]();
		actor.item = new paper.Raster();

		actor.initParams(_name);
		actor.initVariant(_variant);
		actor.setState();

		actor.item.scale(config.params[_name].general.scale);

		helpers.setConfigPosition(actor, this.level, _name, this.nums);

		//_player.possess(pawn);
		_array.push(actor);
		this.actors.push(actor);

		this.nums[_name]++;

		if(actor.params.respawn){
			setInterval(function(){
				if(actor && actor.item && actor.curState.name != "accept")
					helpers.setNotIntersectRandomPoint(actor, game.activeScene.actors);
			}, actor.params.respawn * 1000)
		}
	};
	se.Scene.prototype.initObstacles = function() {
		var curScene = this;
		if(curScene.obstacles.length){
			curScene.obstacles.map(function(obst){
				curScene.actors.splice(curScene.actors.indexOf(obst), 1);

				if(obst.item)
					obst.item.remove();
			})
		}
		curScene.obstacles = [];

		var domObstacles = $('#' + curScene.level.name + " ." + config.obstacle.class + ", nav." + config.obstacle.class);
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