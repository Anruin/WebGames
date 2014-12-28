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
					window.sound("pickup");

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
					if(obj.name == "bomb" && obj.command == "idle") {
						window.sound("pit");
						obj.command = "active";
						var intervalID = setInterval(function () {
							if (!pawn.item.bounds.intersects(obj.item.bounds)) {
								obj.command = "idle";
								clearInterval(intervalID);
							}
						}, 200);
					}

					if(obj.name == "bomb" && obj.command == "move")
						window.sound("bang");

					obj.nextState("intersects");
					var takenScore = helpers.calcScoreAndLives(pawn, config.params.enemy);

					if(pawn.lives < 0){
						game.over("lose");
						return;
					}
					for(var i = 0; i < takenScore; i++){
						pawn.removeSegment(0);
						curScene.createActor("collectible", curScene.collectibles, null, 'prev');
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
	se.Scene.prototype.createActor = function(_name, _array, _variant, note) {
		if(!this.nums[_name])
			this.nums[_name] = 0;

		var actor = new se[helpers.uppercaseFirstChar(_name)]();
		actor.item = new paper.Raster();

		actor.initParams(_name);
		if(config.params[_name].general.variantPerLevel) {
			var index = config.levels.indexOf(this.level);
			if(note == "prev")
				index = index - 1;
			_variant = (index < config.params[_name].variant.length) ? index : index - config.params[_name].variant.length;
		}
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