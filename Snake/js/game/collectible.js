/**
 * Created by Anry on 25.10.2014.
 */

(function(se, paper) {
	se.Collectible = function (_pos) {
		if (se.Debug) console.log("Collectible created", this);
		this.item = new Raster("collectible-01");
		this.item.position = _pos;
		this.item.scale(se.BlockScale);
	};
})(window.se = window.se || {});

console.log('collectible.js');