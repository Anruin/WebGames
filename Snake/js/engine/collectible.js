/**
 * Created by Anry on 25.10.2014.
 */
define([
	"../se",
	"../engine/common",
	"../engine/actor"
], function (se) {
	console.log('collectible.js');
	se.Collectible = function () {
	};
	se.EXTEND(se.Collectible, se.Actor);
})