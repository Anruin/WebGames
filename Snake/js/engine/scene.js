/**
 * Created by Anry on 25.10.2014.
 */
console.log('scene.js');
(function(se, paper) {
	/**
	 * Scene constructor
	 * @param _game
	 * @constructor
	 */
	se.Scene = function(_game) {
		this.pawns = [];
		this.actors = [];
	};

	/**
	 * Update frame
	 * @param _dt delta time
	 */
	se.Scene.prototype.update = function (_dt) {
		if (se.$debug) console.log('Scene update');

		for (var i = 0; i < this.actors.length; i++) {
			this.actors[i].update(_dt);
		}
	};

	/**
	 * Create new actor
	 */
	se.Scene.prototype.createActor = function () {
		var actor = new se.Actor();
		this.actors.push(actor);
		return actor;
	};

	/**
	 * Create new pawn and possess by player
	 * @param _player
	 */
	se.Scene.prototype.createPawn = function(_player) {
		var pawn = new se.Pawn();
		_player.possess(pawn);
		this.pawns.push(pawn);
	}
})(window.se = window.se || {}, paper);