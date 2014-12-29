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
		this.duration = 0.5;
		var controller = this;
		controller.steps = {};
		controller.steps.isend = true;
		this.keyUp = _.debounce(function(){
			if(controller.steps.stop)
				controller.steps.stop();
			controller.steps.isend = true;
			controller.isKeyDown = false;
		}, 500);
		this.stepSound = function(){
			//if(controller.steps.isend)
			//	controller.steps = window.sound('steps');

			controller.steps.isend = false;
			controller.steps.onended = function(){
				controller.steps.isend = true;
			}
		};

		this.controls = config.params.pawn.general.controls;



	};
	se.Controller.prototype.resetKeyDownTm = function (controller){
		if(controller.keyDownTm)
			clearTimeout(controller.keyDownTm);

		controller.keyDownTm = setTimeout(function(){
			controller.steps.isend = true;
			controller.isKeyDown = false;
			try{
				if(controller.steps.stop)
					controller.steps.stop();
			}
			catch(e) {
				console.log('cant stop');
			}
		}, 500);
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
		if(this.key!=_key)
			this.timer = -1;

		this.key = _key;
		this.resetKeyDownTm(this);
		//this.keyUp();
		// Look for key to action mapping for pressed key

		return false;
	};
	se.Controller.prototype.onCessation = function(_key) {
		this.pawn.action('setState', this.pawn.curState.name, 'idle');
		this.pawn.velocity = null;
	};
	se.Controller.prototype.update = function(_dt){
		if (this.timer > 0) {
			this.timer -= _dt;
			return false;
		} else {
			if(!this.isKeyDown)
				this.onCessation();
			else{
				console.log('action');
				var control = this.getByKey(this.key);
				// Perform mapped action on pawn
				if (control) {
					this.stepSound();
					this.pawn.action(control.func, control.params);
				}
			}
			this.timer = this.duration;
		}
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