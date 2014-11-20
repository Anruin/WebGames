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
	se.Actor.prototype.action = function (_func, _params, _subparams) {
		this[_func](_params, _subparams);
	};

	se.Actor.prototype.initParams = function (_name) {
		this.params = _.clone(config.params[_name].general);
		this.params.name = _name;
	};
	se.Actor.prototype.initVariant = function (_variant) {
		var curActor = this;
		var variant;
		//если передан индекс варианта, тогда установится он, иначе установится случайный вариант
		if(_variant || _variant == 0)
			variant = config.params[curActor.params.name].variant[_variant];
		else {
			var randIndex = helpers.randomIndex(config.params[curActor.params.name].variant);
			variant = config.params[curActor.params.name].variant[randIndex];
		}
		curActor.name = variant.name;
		//если существует свойство states
		if(variant.states) {
			//если состояния представляет из себя обьект а не массив
			if(!_.isArray(variant.states)) {
				//тогда берется имя каждого свойства, и с этими именами создается массив из состояний
				for (var objName in variant.states) {
					var obj = {
						name: objName,
						img: variant.states
					};
					curActor.states.push(obj);
				}
				//устанавливаем изначальную комманду, на тот случай, если изначальная команда не зада в конфиге
				variant.initCommand = curActor.states[0].name;
			}
			else {
				//иначе состояния представляют из себя массив
				variant.states.map(function(state){
					//если первый обьект массива img представляет из себя не строку, а обьект, содержащий набор изображений для каждой команды
					if(!_.isString(state.img[0]))
						//тогда добавляем данное состояние в массив, так как оно в нужном для нас виде
						curActor.states.push(state);
					else {
						//иначе приводим к нужному для нас виду, создавая команду с именем, идентичным имени состояния
						var _img = {};
						_img[state.name] = state.img;
						state.img = _img;
						curActor.states.push(state);
					}
				});
				//устанавливаем изначальную комманду, на тот случай, если изначальная команда не зада в конфиге
				variant.initCommand = Object.keys(curActor.states[0].img)[0];
			}
		}
		else {
			//иначе, если свойства states не существует, тогда variant представляет из себя обьект с свойствами-коммандами,
			//содержащими массивы изображений, тогда формируем из этих комманд состояния
			for(var state in variant){
				var _img = {};
				_img[state] = variant[state];
				curActor.states.push({name: state, img: _img})
			}
			//устанавливаем изначальную комманду, на тот случай, если изначальная команда не зада в конфиге
			variant.initCommand = curActor.states[0].name;
		}
		//в результате манипуляций извлекаем состояния из обьекта variants и приводим массив состояний к такому виду:
		//states:
		//[
		//	{
		//		name: "state1",
		//		img: {
		//			command1: ["image1", "image2"],
		//			command2: ["image3"]
		//		}
		//	},
		//	{
		//		name: "state2",
		//		img: {
		//			command1: ["image4", "image5"]
		//		}
		//	}
		//]
		curActor.params.initState = variant.initState || curActor.states[0].name;
		curActor.command = variant.initCommand || curActor.command;

		//Извлекаем перегруженные свойства params из текущего variant
		for(var param in variant){
			if(curActor.paramsNames.some(function(p){return p == param}))
				curActor.params[param] = variant[param];
		}
	};

	se.Actor.prototype.nextState = function (term) {
		var curActor = this;

		if(curActor.curState.next && curActor.curState.next.if == term){
			if(curActor.curState.next.state.velocity || curActor.curState.next.state.velocity == null)
				curActor.velocity = curActor.curState.next.state.velocity;

			var next = curActor.curState.next;
			setTimeout(function(){
				curActor.setState(next.state, next.command);
			}, next.duration || 0);
		}
	};

	se.Actor.prototype.setState = function (_stateName, _command) {
		_stateName = _stateName || this.params.initState;
		_command = _command || this.command;

		if(this.curState && this.curState.name == _stateName && this.command == _command)
			return;

		console.log("set state: " + _stateName + ", command: " + _command);

		this.command = _command;
		//поиск state в массиве this.states по имени
		this.curState = this.states.filter(function(state){
			return state.name == _stateName;
		})[0];

		var initImage = "";
		//если в текущем state задано изначальное изображение, то установиться оно
		if(this.curState.initImage)
			initImage = this.curState.initImage;
		else{
			//иначе установиться или первое изображение среди изображений обьекта state, или рандомное, если так сказано в конфиге
			var index = 0;
			if(this.params.randomImage){
				var imgArray = this.curState.img[this.command];
				if(!imgArray){
					if(config.debug)
						console.log("command " + this.command + " not exist in " + this.curState.name
						+ " state, will take random command");

					this.command = Object.keys(this.curState.img)[helpers.randomIndex(Object.keys(this.curState.img))];
					imgArray = this.curState.img[this.command];
				}
				index = helpers.randomIndex(imgArray);
			}
			else if(this.params.uniqueImage){
				index = game.activeScene.nums[this.params.name];
				if(!this.curState.img[this.command][index])
					index = index - this.curState.img[this.command].length;
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

		this.nextState("auto");
	};

});