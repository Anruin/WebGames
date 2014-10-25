/**
 * Created by Anry on 25.10.2014.
 */
(function(se, paper) {
	se.Game = function (paper) {
		this.player = new se.Player();
		this.pawn = new se.Pawn(this.player);
		this.collectibles = [];
		this.obstacles = [];
		this.collectibles.push(new se.Collectible(new Point(300, 200)));
		this.collectibles.push(new se.Collectible(new Point(150, 100)));
		this.collectibles.push(new se.Collectible(new Point(200, 150)));
		if (se.Debug) console.log("Game created", this);
	};

	se.Game.prototype.update = function(event) {
		this.pawn.update(this, event);
	};
})(window.se = window.se || {});

console.log("game.js");