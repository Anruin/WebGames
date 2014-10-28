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
			config.img.followers.map(function(name){
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
			var x = helpers.randomNum(100, paper.project.view.bounds.width - 200);
			var y = helpers.randomNum(100, paper.project.view.bounds.height - 200);
			return new paper.Point(x,y);
		},
		setNotIntersectRandomPoint: function(forRandom, arrayForCompare){
			var temporary = new se.Actor();
			temporary.item = new paper.Raster();

			temporary.item.size = new paper.Size(forRandom.item.bounds.width,
					forRandom.item.bounds.height);

			temporary.item.position = helpers.getRandomPointInView();

			while(helpers.isIntersects(arrayForCompare, temporary)){
				temporary.item.position = helpers.getRandomPointInView();
			}

			forRandom.item.position = temporary.item.position;
			temporary.item.remove();
		},
		isIntersects: function(array, object) {
			return array.some(function (el){
				return el.intersects(object);
			});
		},
		pointSumm: function(point1, point2){
			return new paper.Point(point1.x + point2.x, point1.y + point2.y);
		},
		pointDiff: function(point1, point2){
			return new paper.Point(point1.x - point2.x, point1.y - point2.y);
		}
	}
	return helpers;
})