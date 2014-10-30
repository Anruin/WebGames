/**
 * Created by Anry on 25.10.2014.
 */

define([
	"../se",
	"../game/config"
], function (se, config) {
	se.Game = function(paper) {
		this.paper = paper;
		this.scenes = [];
		this.activeScene = null;
		this.players = [];
		this.level = null;
	};

	se.Game.prototype.update = function (_dt) {
		if (se.$debug) console.log('Game update');

		if(!this.activeScene.level){
			this.activeScene.level = config.levels[0];
			this.initLevel();
		}

		if (this.activeScene)
			this.activeScene.update(_dt);

		if(this.activeScene.mainPawn.score == this.activeScene.level.score){
			this.activeScene.level = config.levels[config.levels.indexOf(this.activeScene.level) + 1];

			if(!this.activeScene.level)
				this.gameOver();

			this.initLevel();
		}
	}
	se.Game.prototype.initLevel = function () {
		if(!game.activeScene.mainPawn)
			game.activeScene.mainPawn = game.activeScene.pawns[0];

		game.activeScene.mainPawn.item.position = game.activeScene.level.spawn;
		game.activeScene.mainPawn.lastPosition = game.activeScene.level.spawn;

		if(config.levels.indexOf(game.activeScene.level)==0){
			game.activeScene.initObstacles();
		}
		else {
			$('html, body').animate({
				scrollTop: $('#' + this.activeScene.level.name).offset().top
			}, {
				duration: 500,
				complete: function() {
					game.activeScene.initObstacles();
				}
			});
		}

		this.activeScene.collectibles.map(function(obj){
			obj.item.remove();
		})
		this.activeScene.collectibles = [];
	}

	se.Game.prototype.gameOver = function () {
		game.activeScene.mainPawn.item.position = [-1000,-1000];
		this.activeScene.level = config.finish;

		paper.project.clear();
		paper.project.remove();

		document.getElementById('sx-game').style.display = "none";

		$('html, body').animate({
			scrollTop: $('#' + this.activeScene.level.name).offset().top
		},500);
	}
})