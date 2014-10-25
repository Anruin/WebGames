/**
 * Created by Anry on 25.10.2014.
 */
console.log('santa_controller.js');
(function(se, paper) {
	se.SantaController = function() {
		this.pawn = null;
		// TODO: Take from configuration
		this.controls = [
			{
				keys: ['a', 'left'],
				action: this.pawn.turn,
				params: { direction: se.Directions.LEFT }
			}, {
				keys: ['w', 'up'],
				action: this.pawn.turn,
				params: { direction: se.Directions.UP }
			}, {
				keys: ['d', 'right'],
				action: this.pawn.turn,
				params: { direction: se.Directions.RIGHT }
			}, {
				keys: ['s', 'down'],
				action: this.pawn.turn,
				params: { direction: se.Directions.DOWN }
			}
		];
	};

	se.$extend(se.SantaController, se.Controller);
})(window.se = window.se || {});