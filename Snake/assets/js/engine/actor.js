/**
 * Created by Anry on 25.10.2014.
 */
define([
	"../se",
	"../helpers/helpers",
	"../game/config"
], function (se, helpers, config) {
	se.Actor = function () {
		// Paper.js item
		this.item = null;
		// Used to move actor back for step on collision
		this.lastPosition = null;
		// Currently playing animation
		this.activeAnimation = null;
		// Animation timer
		this.animationTimer = 0.0;
		// Last turn direction
		this.lastTurn = null;
		// Vector velocity of actor
		this.velocity = null;
		// List of animations
		this.animations = [];
		this.command = null;
	};

	/**
	 * Update actor
	 * @param _dt delta time
	 */
	se.Actor.prototype.update = function (_dt) {
		//if debug mode, then paper.js item will selected, example:
		//http://paperjs.org/tutorials/project-items/working-with-items/
		this.item.selected = config.debug;

		if (this.velocity && this.command != "stay")
			this.move(this.velocity);

		if (this.activeAnimation) {
			var frame = this.activeAnimation.update(_dt);
			if (frame !== false && frame !== null) {
				this.item.image = document.getElementById(frame);
			}
		}
	};

	/**
	 * Actor movement
	 * @param _velocity velocity vector to add to current coordinates
	 */
	se.Actor.prototype.move = function (_velocity) {
		if (!_velocity)
			return false;
		// Test if out of level bounds
		if (paper.project.view.bounds.contains(this.item.bounds)) {
			// Store last position
			this.lastPosition = this.item.position;
			// Add position
			this.item.position = helpers.pointSumm(this.item.position, _velocity, config.params.pawn.speed);
		} else {
			// Teleport back to last position
			if(this.item.position != this.lastPosition) {
				this.item.position = this.lastPosition;
			} else {
				this.item.position = helpers.pointDiff(this.item.position, _velocity, config.params.pawn.speed);
			}
		}
	};

	/**
	 * Actor direction changes
	 * @param _params
	 */
	se.Actor.prototype.turn = function (_params) {
		// Store last direction
		this.lastTurn = _params.name;
		// Set velocity
		this.velocity = _params.direction;
		// Select animation from animation library
		this.activeAnimation = this.animations.filter(function (obj) {
			return obj.name == _params.name;
		})[0];
	};

	/**
	 * Action allows actor to perform an action with parameters
	 * @param _func
	 * @param _params
	 */
	se.Actor.prototype.action = function (_func, _params) {
		this[_func](_params);
	};
});