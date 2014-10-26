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
	"../game/santa_controller"
], function (se, config, helpers){
function Start () {
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
		controller.onInput(event);
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
	pawn = new se.Santa();
	pawn.item = new paper.Raster();
	pawn.item.position = [100, 100];
	game.activeScene.pawns.push(pawn);
	console.log('Pawn created', pawn);

	pawn.animations = helpers.getFramesAnimations();
	// Select active animation
	pawn.activeAnimation = pawn.animations[0];

	// Create controller
	console.log('Create controller');
	controller = new se.SantaController(pawn);
	console.log(controller);

	//paper.project.initialize();
	console.log('test.js');
}
	return Start;
});
