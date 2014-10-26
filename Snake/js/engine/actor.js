/**
 * Created by Anry on 25.10.2014.
 */
console.log('actor.js');
(function(se, paper) {
	se.Actor = function() {
		/**
		 * Paper item
		 * @type {}
		 */
		this.item = null;
		/**
		 * Animations library
		 * @type {}
		 */
		this.animations = null;
	};

	se.Actor.prototype.update = function(_dt) {
	};

	se.Actor.prototype.move = function(_point) {
		this.actor.position += _point;
	};

	se.Actor.prototype.intersects = function(_actor) {
		if (_actor && ((this.item.bounds.x + this.item.bounds.width > _actor.item.bounds.x) && (this.item.bounds.y + this.item.bounds.height > _actor.item.bounds.y) && (_actor.item.bounds.x + _actor.item.bounds.width > this.item.bounds.x) && (_actor.item.bounds.y + _actor.item.bounds.height > this.item.bounds.y)))
			return true;
		return false;
	};

	/////////////////////////////////////
	/*
	se.Actor = function(_position, _sprites) {
		this.gx = _sprites;
		this.dir = new Point(0, 0);
		this.dirNum = 3;
		this.item = new Raster(_sprites[se.Directions.DOWN].stand);
		this.item.position = _position;
		this.item.scale(se.BlockScale);
		this.next = null;
	};

	se.Actor.prototype.update = function(event) {
		this.move(this.dir * se.Step);
		if (this.next) {
			this.next.update(event);
			// this.next.turn(this.dir);
		}
		var moveGx = this.gx[this.dirNum].move;
		//fixik:
		if(!moveGx)
			return true;

		var num = event.count%10;
		while(num >= moveGx.length)
			num -= moveGx.length;

		if(event.count%(config.params.actor.interval - 1) === 0) {
			console.log(this.gx[this.dirNum].move[num] + " - " + event.count + " - " + event.delta);
			this.item.image = document.getElementById(moveGx[num]);
		}
	};

	se.Actor.prototype.move = function(_pos) {
		this.item.position += _pos;
	};

	se.Actor.prototype.intersects = function (_item) {
		if (_item) {
			if ((this.item.bounds.x + this.item.bounds.width > _item.bounds.x) && (this.item.bounds.y + this.item.bounds.height > _item.bounds.y) && (_item.bounds.x + _item.bounds.width > this.item.bounds.x) && (_item.bounds.y + _item.bounds.height > this.item.bounds.y)) {
				return true;
			}
		}
	};

	se.Actor.prototype.turn = function(dir) {
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
	};*/
})(window.se = window.se || {}, paper);
