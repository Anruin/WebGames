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
	 * Block
	 * @constructor
	 */
	se.Block = function(_pos, _gx) {
		this.gx = _gx;
		this.dir = new Point(0, 0);
		this.dirNum = 3;
		this.item = new Raster(_gx[se.Directions.DOWN].stand);
		this.item.position = _pos;
		this.item.scale(se.BlockScale);

		// Hierarchy
		var next;
	};

	se.Block.prototype.update = function(event) {
		this.move(this.dir * se.Step);
		if (this.next) {
			this.next.update();
			this.next.turn(this.dir);
		}

		var num = event.count%10;
		var length = this.gx[this.dirNum].move.length;
		while(num >= length)
			num -= length;

		if(event.count%49 === 0) {
			console.log(this.gx[this.dirNum].move[num]);
			this.item.image = document.getElementById(this.gx[this.dirNum].move[num]);
		}
	};

	se.Block.prototype.move = function(_pos) {
		this.item.position += _pos;
	};

	se.Block.prototype.turn = function(dir) {
		switch (dir) {
			case se.Directions.UP:
				this.dir = new Point(0, -1);
				this.dirNum = se.Directions.UP;
				break;
			case se.Directions.DOWN:
				this.dir = new Point(0, 1);
				this.dirNum = se.Directions.DOWN;
				break;
			case se.Directions.LEFT:
				this.dir = new Point(-1, 0);
				this.dirNum = se.Directions.LEFT;
				break;
			case se.Directions.RIGHT:
				this.dir = new Point(1, 0);
				this.dirNum = se.Directions.RIGHT;
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
		var headGx = {};
		headGx[se.Directions.LEFT] = config.img.pawn.left;
		headGx[se.Directions.UP] = config.img.pawn.up;
		headGx[se.Directions.RIGHT] = config.img.pawn.right;
		headGx[se.Directions.DOWN] = config.img.pawn.down;

		this.head = new se.Block(Point(0, 0), headGx);
		if (se.Debug) console.log("Pawn created", this);
	};

	se.Pawn.prototype.grow = function() {
		var blockGxU = ['collectible-01'];
		var block = new se.Block(blockGx);
		this.blocks.push();
	};

	se.Pawn.prototype.turn = function(dir) {
		this.head.item.image = document.getElementById(this.head.gx[dir].move[0]);
		this.head.turn(dir);
	};

	/**
	 * Pawn frame update
	 */
	se.Pawn.prototype.update = function(event) {
		this.head.update(event);
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
	se.Game.prototype.update = function(event) {
		this.pawn.update(event);
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
	game.update(event);
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