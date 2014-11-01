/**
 * Created by Anry on 25.10.2014.
 */

define([
	"../se",
	"../engine/common",
	"../engine/controller"
], function (se) {
	se.SantaController = function(pawn) {
		//TODO Possible Delete
		this.pawn = pawn;
	};

	se.SantaController.prototype.pawn = null;
	se.$extend(se.SantaController, se.Controller);
})