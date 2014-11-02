/**
 * Created by Eugene on 31.10.2014.
 */
define([
	"../se",
	"../game/config",
	"../helpers/helpers",
	"../engine/scene"
], function (se, config, helpers) {
	se.SantaScene = function() {
		se.Scene.call(this);
	};

	se.SantaScene.prototype.update = function (_dt) {
		se.Scene.prototype.update.call(this, _dt);
		var curScene = this;

		curScene.npc.map(function(npc) {
			if (npc.status == "wait" && curScene.mainPawn.item.bounds.intersects(npc.item.bounds)
					&& curScene.mainPawn.followers.length != 0) {

				var imageArray = config.params.npc.img[npc.activeAnimation.name].accept;
				var image = imageArray[helpers.randomIndex(imageArray)];
				npc.item.image = document.getElementById(image);

				npc.activeAnimation = null;

				npc.status = "success";
				curScene.npc.splice(curScene.npc.indexOf(npc), 1);
				curScene.mainPawn.removeSegment(0);
				curScene.mainPawn.score++;
			}
		});
		if(curScene.prepared && helpers.isForAddToScene(curScene.level, config.params.npc,
						curScene.npc, curScene.mainPawn.score)) {
			curScene.createNPC();
		}
	};
	se.SantaScene.prototype.createPawn = function () {
		se.Scene.prototype.createPawn.call(this);
	};
	se.SantaScene.prototype.initObstacles = function () {
		se.Scene.prototype.initObstacles.call(this);
	};
	se.SantaScene.prototype.createCollectible = function () {
		se.Scene.prototype.createCollectible.call(this);
	};
	se.SantaScene.prototype.createNPC = function () {
		se.Scene.prototype.createNPC.call(this);
	};
});
