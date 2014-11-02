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
		game.activeScene.createPawn(player);
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

		if (game.activeScene.level && game.activeScene.mainPawn.score == game.activeScene.level.score) {
			game.activeScene.level = config.levels[config.levels.indexOf(game.activeScene.level) + 1];

		if(!game.activeScene.level){
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

			game.activeScene.prepared = false;
			$('html, body').animate({
				scrollTop: $('#' + this.activeScene.level.name).offset().top
			}, {
				duration: game.activeScene.level.scroll,
				complete: function() {
					game.startLevel();
				}
			});
		}

		game.activeScene.collectibles.map(function(obj){
			obj.item.remove();
		});
		game.activeScene.collectibles = [];
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
	se.Game.prototype.over = function () {
		game.activeScene.mainPawn.item.position = [-1000,-1000];
		game.activeScene.level = config.finish;

		paper.project.clear();
		paper.project.remove();

		document.getElementById('sx-game').style.display = "none";

		$('html, body').animate({
			scrollTop: $('#' + game.activeScene.level.name).offset().top
		}, config.finish.scroll);

		se.enable_scroll();
	};
});