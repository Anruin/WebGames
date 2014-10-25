(function(se) {
	se.Debug = true;
	se.Step = 1;
	se.BlockScale = 0.5;

	/**
	 * Directions enumerator
	 */
	se.Directions = { LEFT: 0, UP: 1, RIGHT: 2, DOWN: 3 };

	/**
	 * Obstacle
	 * @constructor
	 */
	se.Obstacle = function () {
		if (se.Debug) console.log("Obstacle created", this);
	};

	/**
	 * Collectible
	 * @constructor
	 */
	se.Collectible = function(_pos) {
		if (se.Debug) console.log("Collectible created", this);
		this.gx = new Raster("collectible-01");
		this.gx.position = _pos;
		this.gx.scale(se.BlockScale);
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
		for (i = 0; i < _up.length; i++) {
			raster = new Raster(_up[i]);
			raster.visible = false;
			raster.scale(se.BlockScale);
			this.u.push(raster);
		}
		for (i = 0; i < _down.length; i++) {
			raster = new Raster(_down[i]);
			raster.visible = false;
			raster.scale(se.BlockScale);
			this.d.push(raster);
		}
		for (i = 0; i < _left.length; i++) {
			raster = new Raster(_left[i]);
			raster.visible = false;
			raster.scale(se.BlockScale);
			this.l.push(raster);
		}
		for (i = 0; i < _right.length; i++) {
			raster = new Raster(_right[i]);
			raster.visible = false;
			raster.scale(se.BlockScale);
			this.r.push(raster);
		}
		this.d[0].visible = true;
		if (se.Debug) console.log("Block graphics created", this);
	};

	se.BlockGraphics.prototype.move = function(_pos) {
		var i = 0;
		for (i = 0; i < this.u.length; i++) {
			this.u[i].position += _pos;
		}
		for (i = 0; i < this.d.length; i++) {
			this.d[i].position += _pos;
		}
		for (i = 0; i < this.l.length; i++) {
			this.l[i].position += _pos;
		}
		for (i = 0; i < this.r.length; i++) {
			this.r[i].position += _pos;
		}
	};
	
	/**
	 * Block
	 * @constructor
	 */
	se.Block = function(_graphics) {
		this.gx = _graphics;
		this.dir = new Point(0, 0);

		// Hierarchy
		var next;
	};

	se.Block.prototype.update = function() {
		this.gx.move(this.dir * se.Step);
		if (this.next) {
			this.next.update();
			this.next.turn(this.dir);
		}
	};

	se.Block.prototype.turn = function(dir) {
		switch (dir) {
			case se.Directions.UP:
				this.dir = new Point(0, -1);
				break;
			case se.Directions.DOWN:
				this.dir = new Point(0, 1);
				break;
			case se.Directions.LEFT:
				this.dir = new Point(-1, 0);
				break;
			case se.Directions.RIGHT:
				this.dir = new Point(1, 0);
				break;
			default:
				if (se.Debug) console.log("Something went wrong...");
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
		if (se.Debug) console.log("Pawn created", this);
	};

	se.Pawn.prototype.grow = function() {
		var blockGxU = ['collectible-01'];
		var block = new se.Block(blockGx);
		this.blocks.push();
	};

	se.Pawn.prototype.turn = function(dir) {
		this.head.turn(dir);

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

		this.collectibles.push(new se.Collectible(new Point(300, 200)));
		if (se.Debug) console.log("Game created", this);
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
		this.pawn.update();
	};
})(window.se = window.se || {});

window.game = new se.Game();

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
	game.update();
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
		game.pawn.turn(se.Directions.UP);
	} else if (event.key == "down" || event.key == "s") {
		game.pawn.turn(se.Directions.DOWN);
	} else if (event.key == "left" || event.key == "a") {
		game.pawn.turn(se.Directions.LEFT);
	} else if (event.key == "right" || event.key == "d") {
		game.pawn.turn(se.Directions.RIGHT);
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