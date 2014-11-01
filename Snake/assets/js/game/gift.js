/**
 * Created by Anry on 25.10.2014.
 */

define([
	"../se",
	"../engine/common",
	"../engine/collectible"
], function (se) {
	se.Gift = function() {
		//TODO Possible Delete
		se.Collectible.call(this);
	};

	se.$extend(se.Gift, se.Collectible);

	se.Gift.prototype.update = function() {
		se.Collectible.prototype.update.call(this);
	}
})