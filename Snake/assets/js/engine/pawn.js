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
	console.log('pawn.js');
	se.Pawn = function() {
		this.score = 0;
		this.controller = null;
		this.path = null;
		this.pathOffset = null;
		this.followers = [];
		this.turns = [];
		se.Actor.call(this);
	};
	se.$extend(se.Pawn, se.Actor);

	se.Pawn.prototype.move = function(_dt) {
		if(this.path) {
			this.path.firstSegment.point = this.pathOffset || this.item.position;
			for (var i = 0; i < this.path.segments.length - 1; i++) {
				var segment = this.path.segments[i];
				var nextSegment = segment.next;
				var vector = helpers.pointDiff(segment.point, nextSegment.point);
				vector.length = config.params.path.length;
				nextSegment.point = helpers.pointDiff(segment.point, vector);

				if(!config.params.collectible.offset)
					this.followers[i].item.position = nextSegment.point;
				else {
					var offset = config.params.collectible.offset;
					this.followers[i].item.position = helpers.pointSumm(nextSegment.point, offset);
				}
			}
			this.path.smooth();
		}

		se.Actor.prototype.move.call(this, _dt);
	};
	se.Pawn.prototype.offsetPosition = function() {
		if(this.path){
			var pathOffset= {x:0, y:0};
			switch(this.lastTurn){
				case "right":
					pathOffset = {x:50,y:0};
					break
				case "up":
					pathOffset = {x:75,y:0};
					break
				case "left":
					pathOffset = {x:-50,y:0};
					break
				case "down":
					pathOffset = {x:75,y:0};
					break
			}
			return helpers.pointDiff(this.item.position, pathOffset);
		}
	};
	se.Pawn.prototype.update = function(_dt) {
		this.pathOffset = this.offsetPosition();
		se.Actor.prototype.update.call(this, _dt);
	};
	se.Pawn.prototype.turn = function(_params) {
		se.Actor.prototype.turn.call(this, _params);
	};

	se.Pawn.prototype.addSegment = function(_dt) {
		if(!this.path){
			this.path = new paper.Path(config.params.path);
			this.path.add(this.item.position);
		}
		var segment = new se.Pawn();
		segment.item = new paper.Raster();

		//устанавливает новый обьект в противоположном направлении движения санты
		var position = [this.path.lastSegment.point.x - this.velocity.x * 5,
			this.path.lastSegment.point.y - this.velocity.y * 5];

		this.path.add(position);
		segment.item.position = position;

		var randomImage = config.img.followers[helpers.randomIndex(config.img.followers)];
		segment.item.image = document.getElementById(randomImage);
		segment.item.scale(0.7);

		this.followers.push(segment);
		game.activeScene.actors.push(segment);
	};
})