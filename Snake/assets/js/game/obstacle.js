/**
 * Created by Anry on 25.10.2014.
 */
define([
	"../se",
	"../engine/common",
	"../engine/actor"
], function (se) {
	se.Obstacle = function () {
	};
	se.$extend(se.Obstacle, se.Actor);
})