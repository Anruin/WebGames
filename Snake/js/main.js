(function(se) {
	se.Debug = true;

	/**
	 * Obstacle
	 * @constructor
	 */
	se.Obstacle = function () {
		if (se.Debug) console.log("Obstacle created");
	};

	/**
	 * Collectible
	 * @constructor
	 */
	se.Collectible = function() {
		if (se.Debug) console.log("Collectible created");
	};

	/**
	 * Block graphics structure
	 * @param _up Sprites array for upwards direction
	 * @param _down Sprites array for downwards direction
	 * @param _left Sprites array for left direction
	 * @param _right Sprites array for right direction
	 * @constructor
	 */
	se.BlockGraphics = function (_up, _down, _left, _right) {
		this.u = [];
		this.d = [];
		this.l = [];
		this.r = [];
		var i = 0, raster = null;
		for (i = _up.length - 1; i >= 0; i--) {
			raster = new Raster(_up[i]);
			raster.visible = false;
			this.u.push(raster);
		}
		for (i = _down.length - 1; i >= 0; i--) {
			raster = new Raster(_down[i]);
			raster.visible = false;
			this.d.push(raster);
		}
		for (i = _left.length - 1; i >= 0; i--) {
			raster = new Raster(_left[i]);
			raster.visible = false;
			this.l.push(raster);
		}
		for (i = _right.length - 1; i >= 0; i--) {
			raster = new Raster(_right[i]);
			raster.visible = false;
			this.r.push(raster);
		}
		if (se.Debug) console.log("Block graphics created", this);
	};
	
	/**
	 * Block
	 * @constructor
	 */
	se.Block = function(_graphics) {
		this.gx = _graphics;

		// Hierarchy
		var next;
	};

	se.Block.prototype.update = function() {
		if (this.next) {
			this.next.update();
		}
	};

	/**
	 * Player controllable pawn
	 * @constructor
	 */
	se.Pawn = function() {
		var headGxU = ['pawn-mv-u01', 'pawn-mv-u02'];
		var headGxD = ['pawn-mv-d01', 'pawn-mv-d02'];
		var headGxL = ['pawn-mv-l01', 'pawn-mv-l02'];
		var headGxR = ['pawn-mv-r01', 'pawn-mv-r02'];
		var headGx = new se.BlockGraphics(headGxU, headGxD, headGxL, headGxR);
		this.head = new se.Block(headGx);
		if (se.Debug) console.log("Pawn created");
	};

	se.Pawn.prototype.grow = function() {
		var blockGxU = ['collectible-01'];
		var block = new se.Block(blockGx);
		this.blocks.push();
	};

	se.Pawn.prototype.turn = function(dir) {
		console.log("Turning " + dir);
	};

	/**
	 * Pawn frame update
	 */
	se.Pawn.prototype.update = function() {
		this.head.update();
	};

	/**
	 * Game object
	 * @constructor
	 */
	se.Game = function() {
		this.pawn = new se.Pawn();
		this.collectibles = [];
		this.obstacles = [];
		if (se.Debug) console.log("Game created");
	};

	/**
	 * Startup initialization
	 */
	se.Game.prototype.start = function() {
	};

	/**
	 * Frame update
	 */
	se.Game.prototype.update = function() {
	};
})(window.se = window.se || {});

var game = new se.Game();
console.log(game);

// Create a Paper.js Path to draw a line into it:
var path = new Path();
// Give the stroke a color
path.strokeColor = 'black';
var start = new Point(100, 100);
// Move to start and draw a line from there
path.moveTo(start);
// Note the plus operator on Point objects.
// PaperScript does that for us, and much more!
path.lineTo(start + [ 100, -50 ]);

view.onFrame = function(event) {
};

// Create a centered text item at the center of the view:
var text = new PointText({
	point: view.center,
	content: 'Key press detection.',
	justification: 'center',
	fontSize: 15
});

function onKeyDown(event) {
	if (event.key == "up" || event.key == "w") {
		game.pawn.turn("up");
	} else if (event.key == "down" || event.key == "s") {
		game.pawn.turn("down");
	} else if (event.key == "left" || event.key == "a") {
		game.pawn.turn("left");
	} else if (event.key == "right" || event.key == "d") {
		game.pawn.turn("right");
	}
	// When a key is pressed, set the content of the text item:
	text.content = 'The ' + event.key + ' key was pressed!';
}

function onKeyUp(event) {
	// When a key is released, set the content of the text item:
	text.content = 'The ' + event.key + ' key was released!';
}

/**
 * Called when window is re-sized
 * @param event
 */
function onResize(event) {
}