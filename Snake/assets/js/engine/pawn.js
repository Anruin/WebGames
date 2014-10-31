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
		this.controller = null;
		this.path = null;
		this.firstPath = null;
		this.pathOffset = null;
		this.followers = [];
		this.turns = [];
		se.Actor.call(this);
	};
	se.$extend(se.Pawn, se.Actor);

	se.Pawn.prototype.move = function(_point) {
		if(this.path) {
			this.path.selected = config.debug;
			this.path.firstSegment.point = this.pathOffset || this.item.position;
			//var length = config.params.path.firstLength / 5;
			//for (var i = 0; i < this.path.segments.length - 1; i++) {
			//
			//	var segment = this.path.segments[i];
			//	var nextSegment = segment.next;
			//	var vector = helpers.pointDiff(segment.point, nextSegment.point);
			//	vector.length = length;
			//	nextSegment.point = helpers.pointDiff(segment.point, vector);
			//
			//	if(!config.params.collectible.offset)
			//		this.followers[i].item.position = nextSegment.point;
			//	else {
			//		var offset = config.params.collectible.offset;
			//		this.followers[i].item.position = helpers.pointSumm(nextSegment.point, offset);
			//	}
			//}

			for (var i = 0; i < this.path.segments.length - 1; i++) {
				var segment = this.path.segments[i];
				var nextSegment = segment.next;
				var vector = helpers.pointDiff(segment.point, nextSegment.point);
				vector.length = i===0 ? config.params.path.firstLength : config.params.path.length;
				nextSegment.point = helpers.pointDiff(segment.point, vector);
				if((i+1)%2 == 0) {
					var n = (i+1)/2 - 1;
					if (!config.params.collectible.offset)
						this.followers[n].item.position = nextSegment.point;
					else {
						var offset = config.params.collectible.offset;
						this.followers[n].item.position = helpers.pointSumm(nextSegment.point, offset);
					}
				}
			}
			this.path.smooth();
		}
		//!helpers.isIntersects(this.followers,this) &&
		if(!helpers.isIntersects(game.activeScene.obstacles,this)) // !this.intersects({item:game.activeScene.yellow}))
			se.Actor.prototype.move.call(this, _point);
		else
			this.item.position = this.lastPosition;
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
		this.pathOffset = this.offsetPosition();
		this.setPathDegree();
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

		var randomImage = config.img.followers[helpers.randomIndex(config.img.followers)];
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