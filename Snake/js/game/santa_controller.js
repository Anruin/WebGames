/**
 * Created by Anry on 25.10.2014.
 */

define([
	"../se",
	"../engine/common",
	"../engine/controller"
], function (se) {
	console.log('santa_controller.js');
	se.SantaController = function(pawn) {
		this.pawn = pawn;
		// TODO: Take from configuration
		this.controls = [
			{
				keys: ['a', 'left'],
				func: 'turn',
				params: { direction: se.Directions.LEFT, name: "left" }
			}, {
				keys: ['w', 'up'],
				func: 'turn',
				params: { direction: se.Directions.UP, name: "up" }
			}, {
				keys: ['d', 'right'],
				func: 'turn',
				params: { direction: se.Directions.RIGHT, name: "right" }
			}, {
				keys: ['s', 'down'],
				func: 'turn',
				params: { direction: se.Directions.DOWN, name: "down" }
			}
		];
	};

	se.SantaController.prototype.pawn = null;
	se.$extend(se.SantaController, se.Controller);
})