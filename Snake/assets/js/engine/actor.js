/**
 * Created by Anry on 25.10.2014.
 */
define([
	"../se",
		"../helpers/helpers",
	"../game/config"
], function (se, helpers, config) {
	se.Actor = function () {
		/**
		 * Paper item
		 * @type Object
		 */
		this.item = null;
		this.lastPosition = null;
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
		this.lastTurn = null;
		this.velocity = null;
		this.animations = [];
	};
	/**
	 * Animations library
	 * @type Object
	 // */
		//se.Actor.prototype.animations = [];

	se.Actor.prototype.update = function (_dt) {
		this.item.selected = config.debug;

		if (this.velocity)
			this.move(this.velocity);

		if (this.activeAnimation) {
			var frame = this.activeAnimation.update(_dt);
			if (frame !== false && frame !== null) {
				this.item.image = document.getElementById(frame);
			}
		}
	};

	se.Actor.prototype.move = function (_point) {
		if (!_point)
			return;

		if(paper.project.view.bounds.contains(this.item.bounds)){
			this.lastPosition = this.item.position;
			this.item.position = helpers.pointSumm(this.item.position, _point, config.params.pawn.speed);
		}
		else{
			if(this.item.position != this.lastPosition)
				this.item.position = this.lastPosition;
			else
				this.item.position = helpers.pointDiff(this.item.position, _point, config.params.pawn.speed);
		}
	};
	se.Actor.prototype.turn = function (_params) {
		this.lastTurn = _params.name;
		this.velocity = _params.direction;
		this.activeAnimation = this.animations.filter(function (obj) {
			return obj.name == _params.name;
		})[0];
	};
	se.Actor.prototype.action = function (_func, _params) {
		this[_func](_params);
	};
});