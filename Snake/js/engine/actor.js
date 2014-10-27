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
			this.animations = [];
		};
		/**
		 * Animations library
		 * @type Object
		// */
		//se.Actor.prototype.animations = [];

		se.Actor.prototype.update = function (_dt) {
			if (se.$debug) console.log('Actor update');

			if(this.velocity)
				this.move(this.velocity);

			if (this.activeAnimation) {
				var frame = this.activeAnimation.update(_dt);
				if (frame !== false && frame !== null) {
					this.item.image = document.getElementById(frame);
				}
			}
		};

		se.Actor.prototype.move = function (_point) {
			if(_point){
				this.item.position.x += _point.x;
				this.item.position.y += _point.y;
			}
		};

		se.Actor.prototype.intersects = function (_actor) {
			if(!_actor.item.position && !this.item.position)
				return false;

			return !!(_actor && ((this.item.bounds.x + this.item.bounds.width > _actor.item.bounds.x) && (this.item.bounds.y + this.item.bounds.height > _actor.item.bounds.y) && (_actor.item.bounds.x + _actor.item.bounds.width > this.item.bounds.x) && (_actor.item.bounds.y + _actor.item.bounds.height > this.item.bounds.y)));
		};

	se.Actor.prototype.turn = function(_params) {
		this.velocity = _params.direction;
		this.activeAnimation = this.animations.filter(function(obj){
			return obj.name == _params.name;
		})[0];
	};
	se.Actor.prototype.action = function(_func, _params) {
		this[_func](_params);
	};
})
