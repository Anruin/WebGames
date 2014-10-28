/**
 * Created by Anry on 25.10.2014.
 */
console.log('obstacle.js');
define([
	"../se",
	"../engine/common",
	"../engine/actor"
], function (se) {
	console.log('obstacle.js');
	se.Obstacle = function () {
	};
	se.$extend(se.Obstacle, se.Actor);
})