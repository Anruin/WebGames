/**
 * Created by Anry on 25.10.2014.
 */

define([
	"../se",
	"../game/config",
	"../helpers/helpers",
	"../game/santa_scene",
	"./player",
	"../engine/controller",
	"../engine/common"
], function (se, config, helpers) {
	/**
	 * Game class
	 * @constructor
	 */
	se.Game = function () {
		// Game levels
		this.scenes = [];
		// Current game level object
		this.activeScene = null;
		// Active players
		this.players = [];
		//
		this.level = null;
	};

	/**
	 * Game initialization function
	 */
	se.Game.prototype.create = function () {
		document.getElementById('sx-game').style.display = "block";

		var scene = new se.SantaScene(game);
		game.scenes = [scene];
		game.activeScene = game.scenes[0];

		var player = new se.Player();

		game.activeScene.createActor("pawn", game.activeScene.pawns);
		game.activeScene.mainPawn = game.activeScene.pawns[0];
		game.activeScene.level = config.levels[0];
		game.initLevel();
		var controller = new se.Controller(game.activeScene.mainPawn);
		game.activeScene.mainPawn.controller = controller;
		se.setDebugTools();

		paper.tool.onKeyDown = function (event) {
			controller.onInput(event.key);
			se.debugTools.onKeyDown(event);
		};
		paper.tool.onMouseMove = function (event) {
			se.debugTools.onMouseMove(event);
		};
		paper.tool.onMouseDown = function (event) {
			se.debugTools.onMouseDown(event);
		};

		var resizeDebounce = _.debounce(function(){
			game.activeScene.initObstacles();

			var toReplace = [game.activeScene.pawns, game.activeScene.collectibles, game.activeScene.npc, game.activeScene.enemies];
			toReplace.map(function(array){
				array.map(function(actor){
					if(helpers.isIntersects(game.activeScene.obstacles, actor))
						helpers.setNotIntersectRandomPoint(actor, game.activeScene.obstacles);
				});
			});
			setBulbs ();
			console.log("react to resize");
		}, 300);
		paper.project.view.onResize = function(event){
			resizeDebounce();
		};
	};

	/**
	 * Update game
	 * @param _dt
	 */
	se.Game.prototype.update = function (_dt) {
		if (se.debugTools)
			se.updateDebugTools();

		if (game.activeScene)
			game.activeScene.update(_dt);

		var newLvlIndex = config.levels.indexOf(game.activeScene.level) + 1;
		if (game.activeScene.level && game.activeScene.mainPawn.score == game.activeScene.level.score) {
			game.activeScene.level = config.levels[newLvlIndex];

		if(newLvlIndex >= config.levels.length - 1){
			setTimeout(game.over, 1000);
			return;
		}

			game.initLevel();
		}
	};

	/**
	 * Level initialization
	 */
	se.Game.prototype.initLevel = function () {
		var indexLvl = config.levels.indexOf(game.activeScene.level);

		if(indexLvl == 0){
			game.startLevel();
		}
		else {
			game.activeScene.mainPawn.turn(game.activeScene.mainPawn.controller.getByName("up").params);
			game.activeScene.mainPawn.command = "stay";
			helpers.clearActorsArray(game.activeScene.obstacles);

			if(game.activeScene.level.give){
				game.activeScene.mainPawn.lives += game.activeScene.level.give.lives;
				helpers.initLives();
			}

			game.activeScene.prepared = false;
			$('html body').animate({
				scrollTop: $('#' + this.activeScene.level.name).offset().top
			}, {
				duration: game.activeScene.level.scroll,
				complete: function() {
					game.startLevel();
					setBulbs();
				}
			});
		}
		helpers.clearActorsArray(game.activeScene.collectibles);
		helpers.clearActorsArray(game.activeScene.enemies);
		helpers.clearActorsArray(game.activeScene.toRemove);
		game.activeScene.nums = {};
	};

	se.Game.prototype.startLevel = function (){
		game.activeScene.initObstacles();

		if(game.activeScene.level.spawn)
			game.activeScene.mainPawn.item.position = helpers.getPointPixels(game.activeScene.level.spawn);
		else
			helpers.setNotIntersectRandomPoint(game.activeScene.mainPawn.item.position, game.activeScene.obstacles);

		game.activeScene.mainPawn.lastPosition = game.activeScene.mainPawn.item.position;
		game.activeScene.prepared = true;
		game.activeScene.mainPawn.command = null;
	};
	se.Game.prototype.over = function (isLose) {
		game.activeScene.mainPawn.item.position = [-1000,-1000];

		paper.project.clear();
		paper.project.remove();

		document.getElementById('sx-game').style.display = "none";

		$('html, body').animate({
			scrollTop: $('#' + game.activeScene.level.name).offset().top
		}, game.activeScene.level.scroll);

		se.enable_scroll();

		if(isLose) {
			var r = confirm("Вы проиграли! Хотите попробовать снова?");
			if (r == true) {
				game.activeScene.prepared = false;
				$('html body').animate({
					scrollTop: $('#' + config.levels[0].name).offset().top
				}, {
					duration: config.levels[0].scroll,
					complete: function() {
						$('.level-5__btn').trigger("click");
					}
				});
			} else {
				//no
			}
		};
	};
	function setBulbs () {
		if(game.activeScene.bulbs && game.activeScene.bulbs.length)
			game.activeScene.bulbs.map(function(bulb){
				bulb.item.remove();
			});
		game.activeScene.bulbs = [];

		if(game.activeScene.level.name == "level_4"){
			game.activeScene.level.bulbs.map(function(bulb){
				var trigger = {};
				var rect = new paper.Rectangle(helpers.getPointPixels(bulb[0]), helpers.getPointPixels(bulb[1]));
				trigger.item = new paper.Path.Rectangle(rect);
				trigger.elem = ".level-4__text.text-" + (game.activeScene.bulbs.length + 1);
				trigger.isActive = false;
				game.activeScene.bulbs.push(trigger);
			});
		}
	};
});