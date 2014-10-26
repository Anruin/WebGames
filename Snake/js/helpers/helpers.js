/**
 * Created by Eugene on 26.10.2014.
 */

define([
	"../se",
	"../game/config"
], function (se, config){
	var helpers = {
		addImageToDOM: function (_name, _class) {
			var img = document.createElement("IMG");
			img.setAttribute('src', config.img.dir + _name + config.img.ext);
			img.setAttribute('id', _name);

			if(_class && config.params[_class].height)
				img.style.height = config.params[_class].height;

			var container = document.getElementById('images');
			container.appendChild(img);
		},
		addAllImagesToDOM: function (){
			for(var dir in config.img.pawn){
				if(config.img.pawn[dir].stand)
					helpers.addImageToDOM(config.img.pawn[dir].stand);

				config.img.pawn[dir].move.map(function(name){
					helpers.addImageToDOM(name);
				});
			}

			config.img.collectibles.map(function(name){
				helpers.addImageToDOM(name, "collectible");
			});
		},

		createAnimation: function (_name, _frames){
			var animation = new se.Animation();
			animation.name = _name;
			animation.loop = true;
			animation.frames = _frames;
			return animation;
		},
		getFramesAnimations : function(name) {
			var animations = [];
			for(objName in config.img[name]) {
				var frames = [];
				var test = config.img[name][objName];
				config.img[name][objName].move.map(function(image){
					var newFrame = {
						image: image,
						duration: 0.25
					};
					frames.push(newFrame);
				});

				animations.push(helpers.createAnimation(objName, frames));
			}
			return animations;
		},
		randomNum: function(from, to){
			return Math.floor((Math.random() * to) + from);
		},
		randomIndex: function(array){
			return helpers.randomNum(0, array.length-1);
		},
		getRandomPointInView: function() {
			var x = helpers.randomNum(100, paper.project.view.bounds.width-100);
			var y = helpers.randomNum(100, paper.project.view.bounds.height-100);
			return new paper.Point(x,y);
		}
	}
	return helpers;
})