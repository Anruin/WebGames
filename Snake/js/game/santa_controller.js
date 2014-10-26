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
				params: { direction: se.Directions.LEFT }
			}, {
				keys: ['w', 'up'],
				func: 'turn',
				params: { direction: se.Directions.UP }
			}, {
				keys: ['d', 'right'],
				func: 'turn',
				params: { direction: se.Directions.RIGHT }
			}, {
				keys: ['s', 'down'],
				func: 'turn',
				params: { direction: se.Directions.DOWN }
			}
		];
	};

	se.SantaController.prototype.pawn = null;
	se.$extend(se.SantaController, se.Controller);
})