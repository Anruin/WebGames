/**
 * Created by Eugene on 26.10.2014.
 */

define([
	"../se",
	"../game/config"
], function (se, config) {
	var helpers = {
		addImageToDOM: function (_name, _class) {
			var img = document.createElement("IMG");
			img.setAttribute('src', config.img.dir + _name + config.img.ext);
			img.setAttribute('id', _name);

			if (_class && config.params[_class].general.height)
				img.style.height = config.params[_class].general.height;

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
			for (var element in config.images) {
				config.images[element].map(function (variant) {
					for (var type in variant) {
						helpers.addImageArrayToDOM(variant[type]);
					}
				});
			}
		},
		getRandomImage: function (array, type) {
			//if type is set, then search on object's properties
			if(type) {
				var index = helpers.randomIndex(array);
				//for example:
				//     follower[0].normal[1]
				return array[index][type][helpers.randomIndex(array[index][type])];
			}
			//else just search in elements of array
			else
				return array[helpers.randomIndex(array)];
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
			var array = config.params[name].variant;
			//example:
			for (var index in array) {
				var frames = [];
				//TODO considered this moment
				var subArray = array.states[index].animation
						|| config.params[name].variant.states[index].move;

				if(subArray){
					subArray.map(function (image){
						frames.push(image);
					});
				}
				else
					frames = false;

				animations.push(helpers.createAnimation(index, frames));
			}
			return animations;
		},
		randomIndex: function (array) {
			return _.random(0, array.length - 1);
		},
		getRandomPointInView: function () {
			var x = _.random(100, paper.project.view.bounds.width - 200);
			var y = _.random(100, paper.project.view.bounds.height - 200);
			return new paper.Point(x, y);
		},
		getPointPercent: function (point) {
			//если в обьекте point нет свойства x, значит он скорее всего массив
			if (!point.x)
				point = {x: point[0], y: point[1]};

			return {
				x: 100 / paper.project.view.bounds.width * point.x,
				y: 100 / paper.project.view.bounds.height * point.y
			};
		},
		getPointPixels: function (point) {
			//если в обьекте point нет свойства x, значит он скорее всего массив
			if (!point.x)
				point = {x: point[0], y: point[1]};

			return {
				x: point.x / (100 / paper.project.view.bounds.width),
				y: point.y / (100 / paper.project.view.bounds.height)
			};
		},
		toDigits: function (number) {
			return Number(number).toFixed(2);
		},
		setNotIntersectRandomPoint: function (forRandom, arrayForCompare) {

			//require('es6-promise').polyfill();
			//var promise = new window.Promise(function(resolve, reject) {
				forRandom.item.position = helpers.getRandomPointInView();
				while (helpers.isIntersects(arrayForCompare, forRandom)) {
					forRandom.item.position = helpers.getRandomPointInView();
				}
			return forRandom.item.position;
			//	resolve(forRandom.item.position);
			//});

			//promise.then(function(result) {
			//	forRandom.item.position = result;
			//});
		},
		isIntersects: function (array, object) {
			var objBounds = object.bounds || (object.item ? object.item.bounds : object);
			var mainResult = array.some(function (el) {
				if(el == object)
					return false;

				var result;
				//поиск свойства bounds в ппереданых обьектах
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
		isForAddToScene: function (level, name, array, score) {
			var param = config.params[name];
			var indexLvl = config.levels.indexOf(level);

			//есть ли текущий уровень в массиве конфига эллемента .levels: [...]
			var interim = param.general.levels.indexOf(indexLvl) != -1
					//соответствует ли текущее количество установленному в конфиге уровня или эллемента
					&& array.length < ((level[name] ? level[name].appearsNum : false) || param.general.appearsNum);

			//if((level[name] && level[name].maxCount) || param.general.maxCount)
			//	interim = interim && array.length < ((level[name] ? level[name].maxCount : false) || param.general.maxCount);

			if(score !== undefined)
				//не превышает ли количество эллементов необходимого для этого уровня кол-ва очков
				return interim && array.length < level.score - score;
			else
				return interim;
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
		},
		uppercaseFirstChar: function (string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		},
		clearActorsArray: function (array, isNotDeleteElements) {
			array.map(function(actor){
				if(actor.item)
					actor.item.remove();
				else
					actor.remove();
			});
			if(!isNotDeleteElements)
				array.splice(0);
		},
		initLives: function(){
			var hearts = $(".game-live");
			for(var i=0;i<3;i++)
				$( hearts[i] ).removeClass( "svgicon-heart-empty svgicon-heart" )
						.addClass( game.activeScene.mainPawn.lives > i ? "svgicon-heart" : "svgicon-heart-empty" );
		},
		setConfigPosition: function(_actor, _level, _name, _nums){
			//если настройки точек для данного актера существуют
			if(_level && _level[_name] && _level[_name].points) {
				var points = _level[_name].points;
				//если точки представляют из себя массив массивов, тоесть в виде: [[10, 20], [10, 30]]
				if (_.isArray(points[0]) && _.isArray(points[0][0])) {
					//тогда эти точки задают движение актера
					_actor.pointsToMove = points[_nums[_name]].map(function (el) {
						//по видимому пути
						var path = new paper.Path();
						var point = new paper.Point(helpers.getPointPixels(el));
						path.add(point);
						path.selected = config.debug;
						game.activeScene.toRemove.push(path);
						return point;
					});
					_actor.item.position = _actor.pointsToMove[0];
					//следующая позициия устанавливается такая-же для того чтобы в актере автоматически установилась новая позиция, так как эта уже достигнута
					_actor.nextPoint = _actor.pointsToMove[0];
				}
				//иначе, если настройки точек представляют из себя просто массив, по виду: [10, 20]
				else if(_.isArray(points[0])){
					//тогда ищется точка конкретно для данного актера по счету на данном уровне(счет введется в обьекте _nums)
					var point = points[_nums[_name]];
					//если точка для данного актера с номером(по счету) есть
					if(point)
					//тогда эта точка переводится из процентов в пиксели и устанавливается данному актеру
						_actor.item.position = helpers.getPointPixels(point);
					else
						//иначе устанавливается рандомная точка, с условием что позиция актера не будет пересекаться с другими актерами
						helpers.setNotIntersectRandomPoint(_actor, game.activeScene.actors);
				}
				else {
					//если представлен не массив точек для данного уровня, а всего одна точка, тогда эта точка используется для всех актеров этого типа
					_actor.item.position = helpers.getPointPixels(points);
				}
			}
			else
				//если в конфиге не заданы настройки точек, тогда устанавливается рандомная точка
				helpers.setNotIntersectRandomPoint(_actor, game.activeScene.actors);
		},
		calcScoreAndLives: function(actor, param){
			var take = param.take || param.general.take;
			if(take){
				if(take.score){
					var takenScore = take.score > actor.score ? actor.score : take.score;
					actor.score -= takenScore;
				}


				if(take.lives){
					actor.lives -= take.lives;
					helpers.initLives();
				}
			}

			return takenScore;
		},
		enducement: function(num, one, two, five){
		num = Math.abs(num);
		num %= 100;
		if ( (num >= 5) && (num <= 20) ) {
			return five;
		}
		num %= 10;
		if (num == 1) {
			return one;
		}
		if ( (num >= 2) && (num <= 4) ) {
			return two;
		}
		return five;
	}
	};
	return helpers;
});