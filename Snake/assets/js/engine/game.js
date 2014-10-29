/**
 * Created by Anry on 25.10.2014.
 */

define([
	"../se"
], function (se) {
	se.Game = function(paper) {
		this.paper = paper;
		this.scenes = [];
		this.activeScene = null;
		this.players = [];
	};

	se.Game.prototype.update = function (_dt) {
		if (se.$debug) console.log('Game update');

		if (this.activeScene)
			this.activeScene.update(_dt);
	}
})