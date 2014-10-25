/**
 * Created by Anry on 25.10.2014.
 */

(function(se, paper) {
	se.Actor = function(_pos, _gx) {
		this.gx = _gx;
		this.dir = new Point(0, 0);
		this.dirNum = 3;
		this.item = new Raster(_gx[se.Directions.DOWN].stand);
		this.item.position = _pos;
		this.item.scale(se.BlockScale);
		this.next = null;
	};

	se.Actor.prototype.update = function(event) {
		this.move(this.dir * se.Step);
		if (this.next) {
			this.next.update(event);
			// this.next.turn(this.dir);
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
	};
})(window.se = window.se || {});

console.log('actor.js');