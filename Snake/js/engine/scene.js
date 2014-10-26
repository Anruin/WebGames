/**
 * Created by Anry on 25.10.2014.
 */
define([
	"../se",
	"./actor",
	"./pawn"
], function (se) {
	console.log('scene.js');
	/**
	 * Scene constructor
	 * @param _game
	 * @constructor
	 */
	se.Scene = function(_game) {
		this.pawns = [];
		this.actors = [];
	};
	se.Scene.prototype.pawns = [];
	/**
	 * Update frame
	 * @param _dt delta time
	 */
	se.Scene.prototype.update = function (_dt) {
		if (se.$debug) console.log('Scene update');

		for (var actor in this.actors) {
			actor.update(_dt);
		}

		this.pawns.map(function(pawn){
			pawn.update(_dt);
		});
	};

	/**
	 * Create new actor
	 */
	se.Scene.prototype.createActor = function () {
		var actor = new se.Actor();
		this.actors.push(actor);
		return actor;
	};
	se.Scene.prototype.pawn = null;
	/**
	 * Create new pawn and possess by player
	 * @param _player
	 */
	se.Scene.prototype.createPawn = function(_player) {
		var pawn = new se.Pawn();
		_player.possess(pawn);
		this.pawns.push(pawn);
	}
})