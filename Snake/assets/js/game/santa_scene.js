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

		curScene.npc.map(function(npc){
			if(npc.activeAnimation) {
				var intersects = curScene.mainPawn.item.bounds.intersects(npc.item.bounds);
				if (intersects)
					console.log("менеджер рядом");
				if (intersects && curScene.mainPawn.followers.length != 0) {
					var imageArray = config.params.npc.variant[npc.activeAnimation.name].accept;
					var image = imageArray[helpers.randomIndex(imageArray)];
					npc.item.image = document.getElementById(image);
					npc.activeAnimation = null;
					curScene.npc.splice(curScene.npc.indexOf(npc), 1);
					curScene.mainPawn.removeSegment(0);
					curScene.mainPawn.score--;

					if(curScene.mainPawn.score && curScene.mainPawn.score > curScene.npc.length)
						curScene.createNPC();
				}
			}
		});
		var indexLvl = config.levels.indexOf(this.level);
		if(config.params.npc.levels.indexOf(indexLvl) != -1 && !this.npc.length && curScene.prepared){
			for(var i=0; i<3; i++)
				this.createNPC();
		}
		if(this.npc && this.npc.length && !curScene.mainPawn.score){
			this.npc.map(function(npc){
				npc.item.remove();
			})
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
