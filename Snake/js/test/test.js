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
	helpers.addAllImagesToDOM();
			// Create game
	paper.project = new paper.Project(document.getElementById('sx-game'));
	paper.project.tool = new paper.Tool({});
	window.game = new se.Game(paper.project);
	console.log('Game created', game);

	var scene, gift, pawn, animation, framesLeft, framesUp, framesRight, framesDown, controller;

	se.$debug = false;

	// Set up updates
	paper.project.view.onFrame = function(event) {
		game.update(event.delta);
	};

	paper.tool.onKeyDown = function(event) {
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
	santa.item.position = new paper.Point(100,100);
	game.activeScene.pawns.push(santa);
	console.log('Pawn created', santa);

	santa.animations = helpers.getFramesAnimations("pawn");
	// Select active animation
	santa.activeAnimation = santa.animations[0];

	// Create pawn and initialize graphics
	var gift = new se.Gift();
	gift.item = new paper.Raster();
	gift.item.position = new paper.Point(300,300);
	gift.item.image = document.getElementById(config.img.collectibles[0]);
	gift.item.scale(0.5);
	game.activeScene.collectibles.push(gift);
	console.log('Gift created', gift);

	// Create controller
	console.log('Create controller');
	controller = new se.SantaController(santa);
	console.log(controller);

	//paper.project.initialize();
	console.log('test.js');
}
	return Start;
});
