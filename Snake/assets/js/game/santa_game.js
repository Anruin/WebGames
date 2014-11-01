/**
 * Created by Eugene on 31.10.2014.
 */

define([
	"../se",
	"../engine/game",
	"../engine/controller"
], function (se, config) {
	se.SantaGame = function() {
		//TODO Possible Delete
		se.Game.call(this);
	};

	se.SantaGame.prototype.create = function () {
		se.Game.prototype.create.call(this);

		console.log('Create controller');

	}

	se.SantaGame.prototype.update = function (_dt) {
		se.Game.prototype.update.call(this, _dt);
	}
	se.SantaGame.prototype.initLevel = function () {
		se.Game.prototype.initLevel.call(this);
	}
})
