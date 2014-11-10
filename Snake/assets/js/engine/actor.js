/**
 * Created by Anry on 25.10.2014.
 */
define([
	"../se",
	"../helpers/helpers",
	"../game/config"
], function (se, helpers, config) {
	se.Actor = function () {
		this.name = "";
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
		this.command = "idle";
		this.states = [];
		this.curState = {};
		this.params = {};
		this.paramsNames = ["initState", "appearsNum", "initCommand", "duration"];

		//TODO think for more elegant solution
		var curActor = this;
		this.throttleTurn = _.throttle(function(){
			curActor.setState(curActor.lastTurn, "move");
		}, 300);
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
			this.item.position = helpers.pointSumm(this.item.position, _velocity, this.params.speed);
		} else {
			// if still move
			if(this.item.position != this.lastPosition) {
				//then teleport back to last position
				this.item.position = this.lastPosition;
				//else push to back direction
			} else {
				this.item.position = helpers.pointDiff(this.item.position, _velocity, this.params.speed);
			}
		}
	};

	/**
	 * Actor direction changes
	 * @param _params
	 */
	se.Actor.prototype.turn = function (_params) {
		var curActor = this;
		// Store last direction
		curActor.lastTurn = _params.name;
		// Set velocity
		curActor.velocity = _params.direction;
		// Select animation from animation library

		this.throttleTurn();

		//this.activeAnimation = this.animations.filter(function (obj) {
		//	return obj.name == _params.name;
		//})[0];
	};

	/**
	 * Action allows actor to perform an action with parameters
	 * @param _func
	 * @param _params
	 */
	se.Actor.prototype.action = function (_func, _params) {
		this[_func](_params);
	};
	se.Actor.prototype.initParams = function (_name) {
		this.params = _.clone(config.params[_name].general);
		this.params.name = _name;
	};
	se.Actor.prototype.initVariant = function (_variant) {
		var curActor = this;
		var variant;
		if(_variant)
			variant = config.params[curActor.params.name].variant[_variant];
		else {
			var randIndex = helpers.randomIndex(config.params[curActor.params.name].variant);
			variant = config.params[curActor.params.name].variant[randIndex];
		}
		curActor.name = variant.name;

		if(variant.states) {
			if(!_.isArray(variant.states)) {
				for (var objName in variant.states) {
					var obj = {
						name: objName,
						img: variant.states
					};
					curActor.states.push(obj);
				}
				variant.initCommand = curActor.states[0].name;
			}
			else {
				variant.states.map(function(state){
					if(!_.isString(state.img[0]))
						curActor.states.push(state);
					else {
						var _img = {};
						_img[state.name] = state.img;
						state.img = _img;
						curActor.states.push(state);
					}
				});
				variant.initCommand = Object.keys(curActor.states[0].img)[0];
			}
		}
		else {
			for(var state in variant){
				var _img = {};
				_img[state] = variant[state];
				curActor.states.push({name: state, img: _img})
			}
			variant.initCommand = curActor.states[0].name;
		}
		curActor.params.initState = variant.initState || curActor.states[0].name;
		curActor.command = variant.initCommand || curActor.command;

		for(var param in variant){
			if(curActor.paramsNames.some(function(p){return p == param}))
				curActor.params[param] = variant[param];
		}
	};

	se.Actor.prototype.setState = function (_stateName, _command) {
		_stateName = _stateName || this.params.initState;
		this.curState = this.states.filter(function(state){
			return state.name == _stateName;
		})[0];
		this.command = _command || this.command;

		var initImage = "";
		if(this.curState.initImage)
			initImage = this.curState.initImage;
		else{
			var index = 0;
			if(this.params.randomImage){
				var imgArray = this.curState.img[this.command];
				if(!imgArray){
					if(config.debug)
						console.log("command " + this.command+ " not exist in " + this.curState.name + " state, will take random command");

					this.command = Object.keys(this.curState.img)[helpers.randomIndex(Object.keys(this.curState.img))];
					imgArray = this.curState.img[this.command];
				}
				index = helpers.randomIndex(imgArray);
			}

			initImage = this.curState.img[this.command][index];
		}

		this.item.image = document.getElementById(initImage);

		var loop = this.curState.loop || this.params.loop;
		var duration = this.curState.duration || this.params.duration;
		if(loop)
			this.activeAnimation = new se.Animation(this.curState.img[this.command], duration);
		else
			this.activeAnimation = null;

		var curActor = this;
		if(curActor.name == "bomb" && curActor.curState.name == "active") {
			curActor.velocity = null;
			setTimeout(function(){
				curActor.setState("idle", "idle");
				//var name = _.keys(curActor.curState.onActive)[0];
				//curActor.item[name] = curActor.curState.onActive[name];
			}, 2000);
		}
		//var scale = this.curState.scale || this.params.scale;
		//if(scale)
		//	this.item.scale(scale);
	};

});