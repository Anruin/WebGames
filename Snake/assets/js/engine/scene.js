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

					pawn.score += config.params.collectible.general.give.score;
					pawn.lifes += config.params.collectible.general.give.lives;
					pawn.addSegment();
				}
			});
			curScene.enemies.map(function(obj){
				if(obj.command == "idle" && pawn.item.bounds.intersects(obj.item.bounds)){
					obj.setState("active", "active");
					if(obj.name == "bomb"){
						curScene.enemies.splice(curScene.enemies.indexOf(obj), 1);
						curScene.toRemove.push(obj);
					}
					else if(obj.name == "pit"){
						var intervalID = setInterval(function(){
							if(!pawn.item.bounds.intersects(obj.item.bounds)){
								obj.command = "idle";
								clearInterval(intervalID);
							}
						}, 200);
					}

					pawn.score -= config.params.enemy.general.take.score;
					//pawn.lives += config.params.collectible.general.give.lives;
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
			if(!_.isString(variant.states[0].img[0]))
				actor.states = variant.states;
			else{
				variant.states.map(function(state){
					var _img = {};
					_img[state.name] = state.img;
					state.img = _img;
					actor.states.push(state);
				})
				variant.initCommand = actor.states[0].name;
			}
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

		helpers.setNotIntersectRandomPoint(actor, game.activeScene.actors);
		//_player.possess(pawn);
		_array.push(actor);
		this.actors.push(actor);
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