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

		if (this.activeScene)
			this.activeScene.update(_dt);

		if(this.activeScene.mainPawn.score == this.activeScene.level.score){

			this.activeScene.level = config.levels[config.levels.indexOf(this.activeScene.level)+1];

			if(!this.activeScene.level){
				game.activeScene.mainPawn.item.position = [-1000,-1000];
				this.activeScene.level = config.finish;
				//paper.project.view.remove();
				paper.project.clear();
				paper.project.remove();
				document.getElementById('sx-game').style.display = "none";
				$('html, body').animate({
					scrollTop: $('#' + this.activeScene.level.name).offset().top
				},500);
				return false;
			}
			game.activeScene.mainPawn.item.position = game.activeScene.level.spawn;
			game.activeScene.mainPawn.lastPosition = game.activeScene.level.spawn;
			$('html, body').animate({
				scrollTop: $('#' + this.activeScene.level.name).offset().top
			}, {
				duration: 500,
				complete: function() {
					game.activeScene.initObstacles();
				}
			});
			this.activeScene.collectibles.map(function(obj){
				obj.item.remove();
				game.activeScene.collectibles.splice(game.activeScene.collectibles.indexOf(obj), 1);
			})
		}

	}
})