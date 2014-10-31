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

			config.levels.map(function(level){
				level.collectibles.map(function(name){
					helpers.addImageToDOM(name, "collectible");
				});
			});
			config.img.followers.map(function(name){
				helpers.addImageToDOM(name, "follower");
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
			var array = config.img[name] || config[name].variant;

			for(el in array) {
				var frames = [];
				var subArray = config.img[name] ? config.img[name][el].move : el.animation;
				subArray.map(function(image){
					var newFrame = {
						image: image,
						duration: config.params[name].duration
					};
					frames.push(newFrame);
				});

				animations.push(helpers.createAnimation(el, frames));
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
			forRandom.item.position = helpers.getRandomPointInView();
			
			while(helpers.isIntersects(arrayForCompare, forRandom)){
				forRandom.item.position = helpers.getRandomPointInView();
			}
		},
		isIntersects: function(array, object) {
			var objBounds = object.bounds || (object.item ? object.item.bounds : object);
			var mainResult =  array.some(function (el){
				var result;
				if(el.item && !el.item.point)
					result = objBounds.intersects(el.item.bounds) || objBounds.contains(el.item.bounds) || el.item.bounds.contains();
				if(el.item && el.item.point)
					result = objBounds.intersects(el.item) || objBounds.contains(el.item) || objBounds.contains(el.item);
				else if(el.bounds)
					result = objBounds.intersects(el.bounds) || objBounds.contains(el.bounds) || objBounds.contains(el.bounds);
				else
					result = objBounds.intersects(el) || objBounds.contains(el) || objBounds.contains(el);

				return result;
			});
			return mainResult;
		},
		pointSumm: function(point1, point2, factor){
			factor = factor || 1;
			return new paper.Point(point1.x + point2.x * factor, point1.y + point2.y * factor);
		},
		pointDiff: function(point1, point2){
			return new paper.Point(point1.x - point2.x, point1.y - point2.y);
		}
	}
	return helpers;
})