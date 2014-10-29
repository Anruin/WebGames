/**
 * Created by Anry on 25.10.2014.
 */

define([
	"../se",
	"../game/config",
	"../helpers/helpers",
	"../engine/game",
	"../engine/scene",
	"../engine/animation",
	"../game/santa",
	"../game/santa_controller",
			"../game/gift"
], function (se, config, helpers){
		function Start () {
			var scene, gift, pawn, animation, framesLeft, framesUp, framesRight, framesDown, controller;

			helpers.addAllImagesToDOM();
			// Create game
			paper.project = new paper.Project(document.getElementById('sx-game'));
			paper.project.tool = new paper.Tool({});
			window.game = new se.Game(paper.project);
			console.log('Game created', game);

			se.$debug = false;

			// Set up updates
			paper.project.view.onFrame = function (event) {
				game.update(event.delta);
			};

			paper.tool.onKeyDown = function (event) {
				console.log('keydown');
				controller.onInput(event.key);
			};

			// Create scene
			scene = new se.Scene(game);
			console.log('Scene created', scene);

			// Add scene to game scenes
			game.scenes = [scene];
			console.log('Scene pushed', game.scenes);

			// Select active scene
			game.activeScene = game.scenes[0];
			console.log('Active scene set', game.activeScene);

			// Create pawn and initialize graphics
			var santa = new se.Santa();
			santa.item = new paper.Raster();

			santa.item.position = helpers.getRandomPointInView();

			santa.item.scale(config.params.pawn.scale);
			game.activeScene.pawns.push(santa);
			game.activeScene.actors.push(santa);
			game.activeScene.initObstacles();

			while (helpers.isIntersects(game.activeScene.obstacles, santa))
				santa.item.position = helpers.getRandomPointInView();

			console.log('Pawn created', santa);

			santa.animations = helpers.getFramesAnimations("pawn");
			// Select active animation
			//santa.activeAnimation = santa.animations[0];
			santa.item.image = document.getElementById(config.img.pawn.down.stand);

			game.activeScene.createGift();
			// Create pawn and initialize graphics

			console.log('Gift created', gift);

			// Create controller
			console.log('Create controller');
			controller = new se.SantaController(santa);
			console.log(controller);
			//controller.onInput("down");
			//paper.project.initialize();

			//paper.project.initialize();
			santa.update();
		}
	return Start;
});
