/**
 * Created by Eugene on 26.10.2014.
 */

define([
	"../se",
	"../game/config"
], function (se, config){
	var helpers = {
		addImageToDOM: function (name) {
			var img = document.createElement("IMG");
			img.setAttribute('src', config.img.dir + name + config.img.ext);
			img.setAttribute('id', name);
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
				helpers.addImageToDOM(name);
			});
		},

		createAnimation: function (_name, _frames){
			var animation = new se.Animation();
			animation.name = _name;
			animation.loop = true;
			animation.frames = _frames;
			return animation;
		},
		getFramesAnimations : function() {
			var animations = [];
			for(objName in config.img.pawn) {
				var name = objName;
				var frames = [];

				config.img.pawn[objName].move.map(function(image){
					var newFrame = {
						image: image,
						duration: 0.25
					};
					frames.push(newFrame);
				});

				animations.push(helpers.createAnimation(name, frames));
			}
			return animations;
		}
	}
	return helpers;
})