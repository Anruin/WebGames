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
	se.Scene = function(_game) {
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
		if(curScene.prepared && helpers.isForAddToScene(curScene.level, config.params.collectible,
						curScene.collectibles, curScene.mainPawn.score)) {
			curScene.createActor("collectible", curScene.collectibles);
		}
		if(curScene.prepared && helpers.isForAddToScene(curScene.level, config.params.enemy,
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

		var curScene = this;
		var actor = new se[helpers.uppercaseFirstChar(_name)]();
		actor.item = new paper.Raster();

		actor.params = _.clone(config.params[_name].general);
		var variant;
		if(_variant)
			variant = config.params[_name].variant[_variant];
		else {
			var randIndex = helpers.randomIndex(config.params[_name].variant);
			variant = config.params[_name].variant[randIndex];
		}
		actor.name = variant.name;

		//TODO: move this to helpers functions
		if(variant.states) {
			if(!_.isArray(variant.states)) {
				for (var objName in variant.states) {
					var obj = {
						name: objName,
						img: variant.states
					};
					actor.states.push(obj);
				}

				variant.initCommand = actor.states[0].name;
			}
			else {
				variant.states.map(function(state){
					if(!_.isString(state.img[0]))
						actor.states.push(state);
					else {
						var _img = {};
						_img[state.name] = state.img;
						state.img = _img;
						actor.states.push(state);
					}
				})
				variant.initCommand = Object.keys(actor.states[0].img)[0];
			};
		}
		else {
			for(var state in variant){
				var _img = {};
				_img[state] = variant[state];
				actor.states.push({name: state, img: _img})
			}
			variant.initCommand = actor.states[0].name;
		}
		actor.setState(variant.initState || actor.states[0].name, variant.initCommand || null);

		actor.item.scale(config.params[_name].general.scale);

		if(this.level && this.level[_name]) {
			if (_.isArray(this.level[_name][0]) && _.isArray(this.level[_name][0][0])) {
				actor.pointsToMove = this.level[_name][this.nums[_name]].map(function (el) {
					var path = new paper.Path();
					var point = new paper.Point(helpers.getPointPixels(el));
					path.add(point);
					path.selected = config.debug;
					curScene.toRemove.push(path);
					return point;
				});
				actor.item.position = actor.pointsToMove[0];
				actor.nextPoint = actor.pointsToMove[0];
			}
			else if(_.isArray(this.level[_name][0])){
				actor.item.position = helpers.getPointPixels(this.level[_name][this.nums[_name]]);
			}
			else {
				actor.item.position = helpers.getPointPixels(this.level[_name]);
			}
		}
		else
			helpers.setNotIntersectRandomPoint(actor, game.activeScene.actors);

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
				obst.item.remove();
			})
		}
		curScene.obstacles = [];

		var domObstacles = $('#' + curScene.level.name + " ." + config.obstacle.class + ", nav." + config.obstacle.class)
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