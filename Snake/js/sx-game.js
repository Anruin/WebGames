/**
 * Created by Anry on 02.09.14.
 */

(function(sx) {
	sx.Debug = true;

	/**
	 * Vector
	 * @param x
	 * @param y
	 * @returns {sx.Vector}
	 * @constructor
	 */
	sx.Vector = function(x, y) {
		this.x = x;
		this.y = y;
		if (sx.Debug) { console.log('Vector created: ', x, y); }
		return this;
	};

	/**
	 * Compares with other vector
	 * @param vec
	 * @returns {boolean}
	 */
	sx.Vector.prototype.eq = function(vec) {
		return this.x === vec.x && this.y === vec.y;
	};

	/**
	 * Copies values from other vector
	 * @param vec
	 * @returns {sx.Vector}
	 */
	sx.Vector.prototype.set = function(vec) {
		this.x = vec.x;
		this.y = vec.y;
		return this;
	};

	/**
	 * Adds two vectors returning result
	 * @param a
	 * @param b
	 * @returns {Vector}
	 */
	sx.Vector.add = function(a, b) {
		return new sx.Vector(a.x + b.x, a.y + b.y);
	};

	/**
	 * Add scalar value to both coordinates and returns new vector
	 * @param v
	 * @param n
	 * @returns {Vector}
	 */
	sx.Vector.add_scalar = function(v, n) {
		return new sx.Vector(v.x + n, v.y + n);
	};

	/**
	 * Multiplies both coordinates with scalar and returns new vector
	 * @param v
	 * @param n
	 * @returns {Vector}
	 */
	sx.Vector.mul_scalar = function(v, n) {
		return new sx.Vector(v.x * n, v.y * n);
	};

	/**
	 * Compares two vectors
	 * @param a
	 * @param b
	 * @returns {boolean}
	 */
	sx.Vector.eq = function(a, b) {
		return a.x === b.x && a.y === b.y;
	};

	/**
	 * Block
	 * @param pos
	 * @param size
	 * @param prev
	 * @param id
	 * @returns {sx.Block}
	 * @constructor
	 */
	sx.Block = function(pos, size, prev, id) {
		this.pos = pos;
		this.size = size;
		this.prev = prev;
		this.id = id;
		this.next = null;
		this.entity = null;

		if (sx.Debug) { console.log('Block created: ', JSON.stringify(pos), JSON.stringify(size), (prev ? prev.id : '-'), id); }
		return this;
	};

	/**
	 * Moving the block to a new position
	 * @param pos
	 * @param context
	 */
	sx.Block.prototype.update = function(pos, context) {
		// Clear

		if (this.next) {
			this.next.update(this.pos, context);
		}
		this.pos.set(pos);

		// Draw

		return this;
	};

	/**
	 * Snake
	 * @param pos
	 * @param block_size
	 * @param length
	 * @param velocity
	 * @constructor
	 */
	sx.Snake = function(pos, block_size, length, velocity) {
		this.pos = new sx.Vector(pos.x, pos.y);
		this.dir = "down";
		this.steps = 0;
		this.velocity = velocity;
		this.blocks = [];
		this.entity = null;
		this.block_size = block_size;

		document.getElementById("snake-head").setAttribute("src",config.img.snake.down.stand);

		var block = null, prev = null;
		for (var i = 0; i < length; i++) {
			block = new sx.Block(pos, block_size, prev, i);
			if (prev) {
				prev.next = block;
			}
			this.blocks.push(block);
			prev = block;
		}

		if (sx.Debug) { console.log('Snake created: ', JSON.stringify(pos), block_size, length, JSON.stringify(velocity)); }
		return this;
	};

	/**
	 * Moves the snake one step forward and draws its blocks.
	 * @param time_delta
	 * @param context
	 */
	sx.Snake.prototype.update = function(time_delta, context) {
		if (this.blocks.length > 0) {

			var pos_delta = sx.Vector.mul_scalar(this.velocity, time_delta);
			var pos_new = sx.Vector.add(this.pos, pos_delta);
			this.pos = this.blocks[0].update(pos_new, context).pos;

			this.steps++;

			var src;
			if(pos_delta.x || pos_delta.y)
				src = config.img.snake[this.dir].move[this.steps % 2]
			else
				src = config.img.snake[this.dir=="down" || this.dir=="up" ? this.dir : "down"].stand;

			document.getElementById("snake-head").setAttribute("src",src);
			console.log(pos_delta);

			document.getElementById("snake-block-0").style.left = this.pos.x + 'px';
			document.getElementById('snake-block-0').style.top = this.pos.y + 'px';
		}
	};

	/**
	 * Food for snake
	 * @param pos
	 * @returns {sx.Food}
	 * @constructor
	 */
	sx.Food = function(pos) {
		this.pos = pos;
		if (sx.Debug) { console.log('Food created: ', JSON.stringify(pos)); }
		return this;
	};

	/**
	 * Draws food
	 * @returns {sx.Food}
	 */
	sx.Food.prototype.draw = function(context) {
		var food = document.getElementsByClassName("sx-game-obstacle")[0].cloneNode(true);

		var random = Math.floor((Math.random() * config.img.food.length) + 1);
		food.firstChild.setAttribute("src", config.img.food[random-1]);

		document.getElementById(config.container.id).appendChild(food);

		food.style.left = this.pos.x + 'px';
		food.style.top = this.pos.y + 'px';

		// Draw

		return this;
	};

	/**
	 * Obstacle
	 * @param pos
	 * @param size
	 * @returns {sx.Obstacle}
	 * @constructor
	 */
	sx.Obstacle = function(pos, size) {
		this.pos = pos;
		this.size = size;
		if (sx.Debug) { console.log('Obstacle created: ', JSON.stringify(pos), JSON.stringify(size)); }
		return this;
	};

	/**
	 * Main game class
	 * @returns {sx.Game}
	 * @constructor
	 */
	sx.Game = function() {
		this.time = {
			last: 0,
			delta: 0,
			interval: null
		};

		this.objects = {
			snake: new sx.Snake(sx.Game.get_random_pos(), 2, sx.Game.params.snake.length.start, new sx.Vector(0, 0)),
			food: new sx.Food(sx.Game.get_random_pos()),
			obstacles: {
				elements: [],
				objects: []
			}
		};

		/**
		 * Root game element
		 * @type {HTMLElement}
		 * @returns {HTMLElement|boolean}
		 */
		this.el = document.getElementById(config.container.id);
		if (!this.el)
			return false;

		if (sx.Debug) { console.log('Game created'); }
		return this;
	};

	/**
	 * Starts the game
	 * @returns {sx.Game}
	 */
	sx.Game.prototype.start = function() {
		if (!this.el)
			return null;

		// Process obstacles
		this.objects.obstacles.elements = document.getElementsByClassName(config.obstacleClass);
		for (var i = 0; i < this.objects.obstacles.elements.length; i++) {
			var obstacle = this.objects.obstacles.elements[i];
			this.objects.obstacles.objects.push(new sx.Obstacle(new sx.Vector(obstacle.offsetLeft, obstacle.offsetTop), new sx.Vector(obstacle.width, obstacle.height)));
		}

		this.objects.food.draw();

		// Set up updates
		var self = this;
		this.time.interval = setInterval(function() {
			self.update();
		}, sx.Game.params.time.update.interval);

		return this;
	};

	/**
	 * Updates the game
	 * @returns {sx.Game}
	 */
	sx.Game.prototype.update = function() {
		var time_current = Date.now();
		this.time.delta = time_current - this.time.last;
		this.time.last = time_current;
		this.objects.snake.update(this.time.delta, this.context);
		if (this.objects.food == null) {
			this.objects.food = new sx.Food(sx.Game.get_random_pos());
			this.objects.food.draw(this.context);
		}
		return this;
	};

	sx.Game.prototype.turnSnake = function(dir, x, y) {
		this.objects.snake.velocity.set(new sx.Vector(x, y));
		this.objects.snake.dir = dir;
		document.getElementById("snake-head").setAttribute("src",config.img.snake[dir].move[0]);
		return this;
	};

	/**
	 * Game params
	 * @type {{block: {size: number}, snake: {length: {start: number, max: number}, velocity: number}, field: {width: number, height: number}, time: {update: {interval: number}}}}
	 */
	sx.Game.params = config.params;

	/**
	 * Gets random position within game field, doesn't account obstacles
	 * @returns {Vector}
	 */
	sx.Game.get_random_pos = function() {
		return new sx.Vector(Math.floor(Math.random() * (sx.Game.params.field.width + 1)), Math.floor(Math.random() * (sx.Game.params.field.height + 1)));
	};

	sx.game = new sx.Game();
	sx.game.start();
})(window.sx = window.sx || {});

document.onkeydown = function(e) {
	var velocity = sx.Game.params.snake.velocity;

	e = e || window.event;
	switch (e.which || e.keyCode) {
		case 37:
			sx.game.turnSnake('left', - velocity, 0);
			break;
		case 38:
			sx.game.turnSnake('up', 0, - velocity);
			break;
		case 39:
			sx.game.turnSnake('right', velocity, 0);
			break;
		case 40:
			sx.game.turnSnake('down', 0, velocity);
			break;
		default:
			return;
	}
	e.preventDefault();
};
