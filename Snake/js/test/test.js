/**
 * Created by Anry on 25.10.2014.
 */

define([
	"../se",
	"../engine/game",
	"../engine/scene",
	"../engine/animation",
	"../game/santa",
	"../game/santa_controller"
], function (se){
function Start () {
	// Create game
	paper.project = new paper.Project(document.getElementById('sx-game'));
	window.game = new se.Game(paper.project);
	console.log('Game created', game);

	var scene, gift, pawn, animation, framesLeft, framesUp, framesRight, framesDown, controller;

	se.$debug = false;

	// Set up updates
	paper.project.view.onFrame = function(event) {
		game.update(event.delta);
	};

	paper.project.onKeyDown = function(event) {

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

	// Frames for animations
	framesLeft = [
		{ image: 'pawn-mv-l01', duration: 0.25 },
		{ image: 'pawn-mv-l02', duration: 0.25 }];
	framesUp = [
		{ image: 'pawn-mv-u01', duration: 0.25 },
		{ image: 'pawn-mv-u02', duration: 0.25 }];
	framesRight = [
		{ image: 'pawn-mv-r01', duration: 0.25 },
		{ image: 'pawn-mv-r02', duration: 0.25 }];
	framesDown = [
		{ image: 'pawn-mv-d01', duration: 0.25 },
		{ image: 'pawn-mv-d02', duration: 0.25 }];

	// Animations
	animation = new se.Animation();
	animation.name = 'WalkLeft';
	animation.loop = true;
	animation.frames = framesLeft;
	console.log(pawn);
	pawn.animations.push(animation);

	animation = new se.Animation();
	animation.name = 'WalkUp';
	animation.loop = true;
	animation.frames = framesUp;
	pawn.animations.push(animation);

	animation = new se.Animation();
	animation.name = 'WalkRight';
	animation.loop = true;
	animation.frames = framesRight;
	pawn.animations.push(animation);

	animation = new se.Animation();
	animation.name = 'WalkDown';
	animation.loop = true;
	animation.frames = framesDown;
	pawn.animations.push(animation);

	// Select active animation
	pawn.activeAnimation = pawn.animations[0];

	// Create controller
	console.log('Create controller');
	controller = new se.SantaController(pawn);
	controller.pawn = pawn;
	console.log(controller);

	function onKeyDown(event) {
		controller.onInput(event);
		// When a key is pressed, set the content of the text item:
		//text.content = 'The ' + event.key + ' key was pressed!';
	}
	//paper.project.initialize();
	console.log('test.js');
}
	return Start;
});
