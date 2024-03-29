/**
 * Created by Anry on 25.10.2014.
 */

define([
	"../se",
	"../game/config",
	"../helpers/helpers",
	"../engine/common",
	"./actor"
], function (se, config, helpers) {
	se.Pawn = function() {
		this.score = 0;
		this.lives = 3;
		this.controller = null;
		this.path = null;
		this.firstPath = null;
		this.pathOffset = null;
		this.followers = [];
		this.turns = [];
		this.pointsToMove = [];
		this.nextPoint = null;
		se.Actor.call(this);
	};
	se.$extend(se.Pawn, se.Actor);

	se.Pawn.prototype.notToLet = function (array, point){
		var curRect = this.item.bounds;

		function isYIntersects(curRect, elRect){
			return elRect.y + elRect.height > curRect.y && elRect.y < curRect.y + elRect.height
			&& elRect.top < curRect.bottom && elRect.bottom > curRect.top;
		}
		function isXIntersects(curRect, elRect){
			return elRect.x + elRect.width > curRect.x && elRect.x < curRect.x + curRect.width
			&& curRect.left < elRect.right && elRect.left < curRect.right;
		}

		var isRightIntersects = array.some(function(el){
			var elRect = el.item.bounds;
			return curRect.right >= elRect.left && curRect.left <= elRect.left && elRect.right >= curRect.right
			//is top or bottom or y(general) intersects
			&& ((curRect.bottom >= elRect.top && curRect.top <= elRect.top && curRect.bottom <= elRect.bottom)
			|| (curRect.top <= elRect.bottom && curRect.bottom >= elRect.bottom && curRect.top >= elRect.top)
			|| isYIntersects(curRect, elRect));
		});
		var isLeftIntersects = array.some(function(el){
			var elRect = el.item.bounds;
			var isY = isYIntersects(curRect, elRect);
			return curRect.left <= elRect.right && curRect.right >= elRect.right && elRect.left <= curRect.left
			//is top or bottom or y(general) intersects
			&& ((curRect.bottom >= elRect.top && curRect.top <= elRect.top && curRect.bottom <= elRect.bottom)
			|| (curRect.top <= elRect.bottom && curRect.bottom >= elRect.bottom && curRect.top >= elRect.top)
			|| isY);
		});
		var isBottomIntersects = array.some(function(el){
			var elRect = el.item.bounds;
			return curRect.bottom >= elRect.top && curRect.top <= elRect.top && curRect.bottom <= elRect.bottom
			//is right or left or x(general) intersects
			&& ((curRect.right >= elRect.left && curRect.left <= elRect.left && elRect.right >= curRect.right)
			|| (curRect.left <= elRect.right && curRect.right >= elRect.right && elRect.left <= curRect.left)
			|| isXIntersects(curRect, elRect));
		});
		var isTopIntersects = array.some(function(el){
			var elRect = el.item.bounds;
			return curRect.top <= elRect.bottom && curRect.bottom >= elRect.bottom && curRect.top >= elRect.top
				//is right or left or x(general) intersects
			&& ((curRect.right >= elRect.left && curRect.left <= elRect.left && elRect.right >= curRect.right)
			|| (curRect.left <= elRect.right && curRect.right >= elRect.right && elRect.left <= curRect.left)
			|| isXIntersects(curRect, elRect));
		});


		var newPoint = _.clone(point);
		//if(((isRightIntersects && point.x > 0) || (isLeftIntersects && point.x < 0))
		//		&&(isBottomIntersects || isTopIntersects)){
		//	newPoint.x = - point.x;
		//}
		//else if((isRightIntersects || isLeftIntersects)
		//		&&((isBottomIntersects && point.y > 0) || (isTopIntersects && point.y < 0))){
		//	newPoint.y = - point.y;
		//}
		if((isRightIntersects && point.x > 0) || (isLeftIntersects && point.x < 0))
			newPoint.x = 0;
		else if((isBottomIntersects && point.y > 0) || (isTopIntersects && point.y < 0))
			newPoint.y = 0;
		return newPoint;
	}

	se.Pawn.prototype.move = function(_point) {
		//var newPoint = this.notToLet(game.activeScene.obstacles, _point);
		//se.Actor.prototype.move.call(this, newPoint);
		if(!this.params.obstaclesBalk
				|| !helpers.isIntersects(game.activeScene.obstacles, this))
			se.Actor.prototype.move.call(this, _point);
		else{
			if(this.item.position != this.lastPosition)
				this.item.position = this.lastPosition || helpers.setNotIntersectRandomPoint(this, game.activeScene.obstacles);
			else
				this.item.position = helpers.pointDiff(this.item.position, _point, config.params.pawn.general.speed);
		}
	};
	se.Pawn.prototype.setupPath = function() {
		this.path.selected = config.debug;
		this.path.firstSegment.point = this.pathOffset || this.item.position;

		for (var i = 0; i < this.path.segments.length - 1; i++) {
			var segment = this.path.segments[i];
			var nextSegment = segment.next;
			var vector = helpers.pointDiff(segment.point, nextSegment.point);
			vector.length = i === 0 ? config.params.path.firstLength : config.params.path.length;
			nextSegment.point = helpers.pointDiff(segment.point, vector);
			if ((i + 1) % 2 == 0) {
				var n = (i + 1) / 2 - 1;
				if (!config.params.collectible.general.offset)
					this.followers[n].item.position = nextSegment.point;
				else {
					var offset = config.params.collectible.general.offset;
					this.followers[n].item.position = helpers.pointSumm(nextSegment.point, offset);
				}
			}
		}
		this.path.smooth();
	};
	se.Pawn.prototype.offsetPosition = function() {
		var offset = {x:0, y:0};
		if(this.path){
			offset = {x:config.params.path.offset[this.lastTurn].x, y:config.params.path.offset[this.lastTurn].y};
			var firstFollower = this.followers[0];

			if(this.item.position.x < firstFollower.item.position.x && (this.lastTurn=="up"||this.lastTurn=="down")){
				offset.x = - offset.x;
			}
			return helpers.pointDiff(this.item.position,offset);
		}
	};
	se.Pawn.prototype.update = function(_dt) {
		//TODO: take from config:
		if(!this.velocity && this.name == "santa")
			this.setState(this.curState.name, "idle");

		if(this.pointsToMove.length > 1 && this.nextPoint.isInside(this.item.bounds)){
			var nextIndex = this.pointsToMove.indexOf(this.nextPoint) + 1;
			if(nextIndex >= this.pointsToMove.length)
				nextIndex = 0;
			this.nextPoint = this.pointsToMove[nextIndex];

			var vector = helpers.pointDiff(this.nextPoint, this.item.position);
			//var factor = vector.y/(vector.y/0.5)
			this.velocity = vector.multiply(1/400);

			//var first = this.item.position.multiply((1 - 0.1));
			//this.item.position = helpers.pointSumm(first, this.nextPoint.multiply(0.1));
		}
		this.pathOffset = this.offsetPosition();
		this.setPathDegree();

		if(this.path)
			this.setupPath();
		se.Actor.prototype.update.call(this, _dt);
	};
	se.Pawn.prototype.turn = function(_params) {
		this.setPathDegree(_params.name);
		se.Actor.prototype.turn.call(this, _params);
	};

	se.Pawn.prototype.setPathDegree = function(pawnDir) {
		if(!this.path)
			return;

		switch(pawnDir){
			case "up":
				this.path.insertBelow(this.item);
				break
			case "down":
				this.path.insertAbove(this.item);
				break
		}
	};

	se.Pawn.prototype.addSegment = function(_dt) {
		if(!this.path){
			this.path = new paper.Path(config.params.path);
			this.path.add(this.item.position);
		}
		this.path.add(helpers.pointDiff(this.path.lastSegment.point, this.velocity, config.params.path.length));
		var segment = new se.Actor();
		segment.item = new paper.Raster();

		//устанавливает новый обьект в противоположном направлении движения санты
		var position = helpers.pointDiff(this.path.lastSegment.point, this.velocity, config.params.path.length*2);

		this.path.add(position);
		segment.item.position = position;

		var randomImage = helpers.getRandomImage(config.images.follower, "idle");
		//segment.item.visible = false;
		segment.item.image = document.getElementById(randomImage);
		segment.item.scale(config.params.follower.scale);

		this.followers.push(segment);
		game.activeScene.actors.push(segment);
	};

	se.Pawn.prototype.removeSegment = function(index) {
		if(!this.path || !this.path.segments.length)
			return;

		this.path.removeSegment(index + 2);
		this.path.removeSegment(index + 2 - 1);

		this.followers[index].item.remove();
		this.followers.splice(index, 1);

		if(this.path.length < 2){
			this.path.removeSegments();
			this.path = null;
		}
	};
})