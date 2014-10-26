/**
 * Created by Anry on 25.10.2014.
 */
console.log('game.js');
(function(se, paper) {
	se.Game = function(paper) {
		this.paper = paper;
		this.scenes = [];
		this.activeScene = null;
		this.players = [];
	};

	se.Game.prototype.update = function (_dt) {
		if (this.activeScene)
			this.activeScene.update(_dt);
	}
})(window.se = window.se || {}, paper);