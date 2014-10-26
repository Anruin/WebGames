/**
 * Created by Anry on 25.10.2014.
 */
define([
	"../se"
], function (se){
	console.log('actor.js');
		se.Actor = function () {
			/**
			 * Paper item
			 * @type Object
			 */
			this.item = null;
			/**
			 * Active animation
			 * @type Array
			 */
			this.activeAnimation = null;
			this.animationTimer = 0.0;
			/**
			 * Velocity
			 * @type Object
			 */
			this.velocity = null;
		};
		/**
		 * Animations library
		 * @type Object
		 */
		se.Actor.prototype.animations = [];

	se.Actor.prototype.velocity = null;

		se.Actor.prototype.update = function (_dt) {
			if (se.$debug) console.log('Actor update');

			if (this.activeAnimation) {
				var frame = this.activeAnimation.update(_dt);
				if (frame !== false && frame !== null) {
					this.item.image = document.getElementById(frame);
				}
			}
		};

		se.Actor.prototype.move = function (_point) {
			this.item.position += _point;
		};

		se.Actor.prototype.intersects = function (_actor) {
			return !!(_actor && ((this.item.bounds.x + this.item.bounds.width > _actor.item.bounds.x) && (this.item.bounds.y + this.item.bounds.height > _actor.item.bounds.y) && (_actor.item.bounds.x + _actor.item.bounds.width > this.item.bounds.x) && (_actor.item.bounds.y + _actor.item.bounds.height > this.item.bounds.y)));
		};

		/////////////////////////////////////
		/*

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
})
