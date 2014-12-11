/**
 * Created by Anry on 25.10.2014.
 */

define([
	"../se",
	"../game/config"
], function (se, config) {
	/**
	 * Controller defines user input logic
	 * @param pawn
	 * @constructor
	 */
	se.Controller = function(pawn) {
		// Pawn being controlled by this controller
		this.pawn = pawn;
		// Controls rules for this controller
		this.isKeyDown = false;
		var controller = this;
		controller.steps = {};
		this.keyUp = _.debounce(function(){
			controller.steps.stop();
			controller.steps.isend = true;
			controller.isKeyDown = false;
		}, 500);
		this.stepSound = function(){
			if(controller.steps.isend)
				controller.steps = window.sound('steps');

			controller.steps.isend = false;
			controller.steps.onended = function(){
				controller.steps.isend = true;
			}
		};

		this.controls = config.params.pawn.general.controls;
	};
	se.Controller.prototype.getByKey = function(_key) {
		return this.controls.filter(function(o) {
			return (o.keys.indexOf(_key) != -1);
		})[0];
	};
	se.Controller.prototype.getByName = function(_name) {
		return this.controls.filter(function(o) {
			return (o.params.name == _name);
		})[0];
	};
	/**
	 * Receiving and processing user input
	 * @param _key pressed key
	 */
	se.Controller.prototype.onInput = function(_key) {
		this.isKeyDown = true;
		this.keyUp();
		// Look for key to action mapping for pressed key
		var control = this.getByKey(_key);
		// Perform mapped action on pawn
		if (control) {
			this.stepSound();
			this.pawn.action(control.func, control.params);
			return true;
		}
		return false;
	};
	se.Controller.prototype.onCessation = function(_key) {
		this.pawn.action('setState', this.pawn.curState.name, 'idle');
		this.pawn.velocity = null;
		this.isKeyDown = true;
	};
	se.Controller.prototype.update = function(_dt){
		if(!this.isKeyDown)
			this.onCessation()
	};
	/**
	 * Possess pawn with this controller
	 * @param _pawn
	 */
	se.Controller.prototype.possess = function(_pawn) {
		// Free last pawn
		if (this.pawn)
			this.pawn.controller = null;
		// Link controller and pawn
		this.pawn = _pawn;
		_pawn.controller = this;
	};
});