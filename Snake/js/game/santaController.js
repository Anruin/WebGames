/**
 * Created by Anry on 25.10.2014.
 */
console.log('santaController.js');
(function(se, paper) {
	se.SantaController = function() {
		this.pawn = null;
		// TODO: Take from configuration
		this.controls = [
			{
				keys: ['a', 'left'],
				action: controller.pawn.turn,
				params: { direction: se.Directions.LEFT }
			}, {
				keys: ['w', 'up'],
				action: controller.pawn.turn,
				params: { direction: se.Directions.UP }
			}, {
				keys: ['d', 'right'],
				action: controller.pawn.turn,
				params: { direction: se.Directions.RIGHT }
			}, {
				keys: ['s', 'down'],
				action: controller.pawn.turn,
				params: { direction: se.Directions.DOWN }
			}
		];
	};

	se.EXTEND(se.SantaController, se.Controller);
})(window.se = window.se || {});

var controller = new se.SantaController();

function onKeyDown(event) {
	controller.onInput(event);
	// When a key is pressed, set the content of the text item:
	text.content = 'The ' + event.key + ' key was pressed!';
}