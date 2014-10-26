/**
 * Created by Anry on 25.10.2014.
 */
console.log('test.js');
(function(se, paper) {

// Create game
	window.game = new se.Game();
	console.log('Game created', game);
})(window.se = window.se || {}, paper);

var scene, gift, pawn, animation, framesLeft, framesUp, framesRight, framesDown, controller;

se.$debug = false;

// Set up updates
view.onFrame = function(event) {
	game.update(event.delta);
};

view.onKeyDown = function(event) {

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
pawn.item = new Raster();
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