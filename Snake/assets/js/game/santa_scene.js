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
			if (npc.command == "active" && curScene.mainPawn.item.bounds.intersects(npc.item.bounds)
					&& curScene.mainPawn.followers.length != 0) {

				//window.sound("give");

				for(var prop in npc.params.onAccept)
					npc.params[prop] = npc.params.onAccept[prop];

				npc.setState("accept", "accept");
				curScene.npc.splice(curScene.npc.indexOf(npc), 1);
				curScene.mainPawn.removeSegment(0);
				curScene.mainPawn.score --;
				curScene.stats.npc ++;
			}
		});
		if(curScene.prepared && helpers.isForAddToScene(curScene.level, "npc",
						curScene.npc, - (curScene.mainPawn.score + curScene.collectibles.length))) {
			curScene.createActor("npc", this.npc);
		}
		curScene.bulbs.map(function(bulb){
			bulb.item.selected = config.debug;
			if(!bulb.isActive && curScene.mainPawn.item.bounds.intersects(bulb.item.bounds)){
				$(bulb.elem).trigger("click");
				bulb.isActive = true;
				game.resizeDebounce(true);
			}
		});
	};
	se.SantaScene.prototype.createActor = function (name, array, image, isAnimation) {
		se.Scene.prototype.createActor.call(this, name, array, image, isAnimation);
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
