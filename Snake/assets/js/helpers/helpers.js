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

			if (_class && config.params[_class].height)
				img.style.height = config.params[_class].height;

			var container = document.getElementById('images');
			container.appendChild(img);
		},
		addImageArrayToDOM: function (array, className) {
			if (!array)
				return;

			array.map(function (imgName) {
				helpers.addImageToDOM(imgName, className);
			});
		},
		addAllImagesToDOM: function () {
			for (var dir in config.img.pawn) {
				if (config.img.pawn[dir].stand)
					helpers.addImageToDOM(config.img.pawn[dir].stand);

				helpers.addImageArrayToDOM(config.img.pawn[dir].move);
			}

			config.levels.map(function (level) {
				helpers.addImageArrayToDOM(level.collectibles, "collectible");
			});

			helpers.addImageArrayToDOM(config.img.followers, "follower");

			config.params.npc.variant.map(function (variant) {
				helpers.addImageArrayToDOM(variant.animation);
				helpers.addImageArrayToDOM(variant.accept);
			});
		},

		createAnimation: function (_name, _frames) {
			var animation = new se.Animation();
			animation.name = _name;
			animation.loop = true;
			animation.frames = _frames;
			return animation;
		},
		getFramesAnimations: function (name) {
			var animations = [];
			var array = config.img[name] || config.params[name].variant;

			for (el in array) {
				var frames = [];
				var subArray = config.img[name] ? config.img[name][el].move : config.params[name].variant[el].animation;
				subArray.map(function (image) {
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

		randomNum: function (from, to) {
			return Math.floor((Math.random() * to) + from);
		},
		randomIndex: function (array) {
			return helpers.randomNum(0, array.length - 1);
		},
		getRandomPointInView: function () {
			var x = helpers.randomNum(100, paper.project.view.bounds.width - 200);
			var y = helpers.randomNum(100, paper.project.view.bounds.height - 200);
			return new paper.Point(x, y);
		},
		setNotIntersectRandomPoint: function (forRandom, arrayForCompare) {
			forRandom.item.position = helpers.getRandomPointInView();

			while (helpers.isIntersects(arrayForCompare, forRandom)) {
				forRandom.item.position = helpers.getRandomPointInView();
			}
		},
		isIntersects: function (array, object) {
			var objBounds = object.bounds || (object.item ? object.item.bounds : object);
			var mainResult = array.some(function (el) {
				var result;
				if (el.item && !el.item.point)
					result = objBounds.intersects(el.item.bounds) || objBounds.contains(el.item.bounds) || el.item.bounds.contains();
				if (el.item && el.item.point)
					result = objBounds.intersects(el.item) || objBounds.contains(el.item) || objBounds.contains(el.item);
				else if (el.item.bounds)
					result = objBounds.intersects(el.item.bounds) || objBounds.contains(el.item.bounds) || objBounds.contains(el.item.bounds);
				else if (el.bounds)
					result = objBounds.intersects(el.bounds) || objBounds.contains(el.bounds) || objBounds.contains(el.bounds);
				else
					result = objBounds.intersects(el) || objBounds.contains(el) || objBounds.contains(el);

				return result;
			});
			return mainResult;
		},
		pointSumm: function (point1, point2, factor) {
			factor = factor || 1;
			return new paper.Point(point1.x + point2.x * factor, point1.y + point2.y * factor);
		},
		pointDiff: function (point1, point2, factor) {
			factor = factor || 1;
			return new paper.Point(point1.x - point2.x * factor, point1.y - point2.y * factor);
		},
		isForAdToScene: function (level, param, array, score) {
			var indexLvl = config.levels.indexOf(level);
						//есть ли текущий уровень в массиве конфига эллемента .levels: [...]
			return param.levels.indexOf(indexLvl) != -1
						//соответствует ли текущее количество установленному в конфиге эллемента
							&& array.length < param.appearsNum
						//не превышает ли количество эллементов необходимого для этого уровня кол-ва очков
							&& array.length < level.score - score;
		},
		//try to universalize pushProcessing from actor and pawn push, not successful
		pushProcessing: function (point, vector, factor, lastPoint, isNotIntersects) {
			if (isNotIntersects) {
				lastPoint.x = point.x;
				lastPoint.y = point.y;

				return helpers.pointSumm(point, vector, factor);
			}
			else {
				if (point.x != lastPoint.x && point.y != lastPoint.y)
					return lastPoint;
				else
					return helpers.pointDiff(point, vector, factor);
			}
		}
	}
	return helpers;
})