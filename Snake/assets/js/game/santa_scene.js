/**
 * Created by Eugene on 31.10.2014.
 */
define([
	"../se",
	"../helpers/helpers",
	"../engine/scene"
], function (se, helpers) {
	se.SantaScene = function() {
		se.Scene.call(this);
	};

	se.SantaScene.prototype.update = function (_dt) {
		se.Scene.prototype.update.call(this, _dt);
	}
})
