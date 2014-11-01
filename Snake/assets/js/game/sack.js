/**
 * Created by Anry on 25.10.2014.
 */
define([
	"../se",
	"../engine/common",
	"../engine/actor"
], function (se) {
	se.Sack = function() {
		//TODO Possible Delete
		se.Actor.call(this);
	}
	se.$extend(se.Sack, se.Actor);

	se.Sack.prototype.update = function() {
		se.Actor.prototype.update.call(this);
	}
})