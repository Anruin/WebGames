/**
 * Created by Anry on 25.10.2014.
 */

define([
	"../se",
	"../game/config",
	"../game/santa_scene",
	"./player",
	"../engine/controller"
], function (se, config) {
	se.Game = function () {
		this.scenes = [];
		this.activeScene = null;
		this.players = [];
		this.level = null;
	};
	se.Game.prototype.create = function () {
		var scene = new se.SantaScene(game);
		console.log('Scene created', scene);

		game.scenes = [scene];
		console.log('Scene pushed', game.scenes);

		game.activeScene = game.scenes[0];
		console.log('Active scene set', game.activeScene);

		var player = new se.Player();
		game.activeScene.createPawn(player);
		game.activeScene.mainPawn = game.activeScene.pawns[0];
		game.activeScene.level = config.levels[0];
		game.initLevel();
		var controller = new se.Controller(game.activeScene.mainPawn);

		paper.tool.onKeyDown = function (event) {
			controller.onInput(event.key);
			if(event.key == "z"){
				config.debug = !config.debug;
			}
		};
		controller.onInput("down");
	}
	//game. == this.
	se.Game.prototype.update = function (_dt) {
		if (game.activeScene)
			game.activeScene.update(_dt);

		if(game.activeScene.mainPawn.score == game.activeScene.level.score){
			game.activeScene.level = config.levels[config.levels.indexOf(game.activeScene.level) + 1];

			if(!game.activeScene.level)
				setTimeout(game.over, config.finish.scroll);

			game.initLevel();
		}
	};
	se.Game.prototype.initLevel = function () {
		var indexLvl = config.levels.indexOf(game.activeScene.level);

		game.activeScene.mainPawn.item.position = game.activeScene.level.spawn;
		game.activeScene.mainPawn.lastPosition = game.activeScene.level.spawn;

		if(indexLvl == 0){
			game.activeScene.initObstacles();
			game.activeScene.prepared = true;
		}
		else {
			game.activeScene.prepared = false;
			$('html, body').animate({
				scrollTop: $('#' + this.activeScene.level.name).offset().top
			}, {
				duration: game.activeScene.level.scroll,
				complete: function() {
					game.activeScene.initObstacles();
					game.activeScene.prepared = true;
				}
			});
		}

		game.activeScene.collectibles.map(function(obj){
			obj.item.remove();
		});
		game.activeScene.collectibles = [];
	};

	se.Game.prototype.over = function () {
		game.activeScene.mainPawn.item.position = [-1000,-1000];
		game.activeScene.level = config.finish;

		paper.project.clear();
		paper.project.remove();

		document.getElementById('sx-game').style.display = "none";

		$('html, body').animate({
			scrollTop: $('#' + game.activeScene.level.name).offset().top
		},5000);
	};
});