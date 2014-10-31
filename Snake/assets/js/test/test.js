/**
 * Created by Anry on 25.10.2014.
 */

define([
	"../se",
	"../game/config",
	"../helpers/helpers",
	"../game/santa_game",
	"../game/santa_scene",
	"../engine/animation",
			"../game/gift"
], function (se, config, helpers){
		function Start () {

			// Create game
			paper.project = new paper.Project(document.getElementById('sx-game'));
			paper.project.tool = new paper.Tool({});
			paper.project.activate();
			paper.project.view.pause();
			window.game = new se.Game(paper.project);
			window.game.create();
			console.log('Game created', game);

			se.$debug = false;

			// Create scene

			//helpers.setNotIntersectRandomPoint(santa, game.activeScene.obstacles)


			// Select active animation
			//santa.activeAnimation = santa.animations[0];

			// Create pawn and initialize graphics

			// Create controller
			//костыль против непоявления первоначальной игры

			//paper.project.initialize();
			//paper.project.view.play();
			//paper.project.view.update();
			// Set up updates
			paper.project.view.onFrame = function (event) {
				game.update(event.delta);
			};
			paper.project.layers[0].activate();
			paper.project.view.play();
			paper.project.view.update();
		}
	return Start;
});
