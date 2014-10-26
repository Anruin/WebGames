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
				params: [se.Directions.LEFT]
			}, {
				keys: ['w', 'up'],
				action: controller.pawn.turn,
				params: [se.Directions.UP]
			}, {
				keys: ['d', 'right'],
				action: controller.pawn.turn,
				params: [se.Directions.RIGHT]
			}, {
				keys: ['s', 'down'],
				action: controller.pawn.turn,
				params: [se.Directions.DOWN]
			}
		];
	};

	se.SantaController.prototype.onKeyDown = function(_event) {
		var results = this.controls.filter(function(temp) {
			return (temp.keys.indexOf(_event.key) != -1);
		});
		var control = results[0];
		control.action(control.params);
	};

})(window.se = window.se || {});

var controller = new se.SantaController();

function onKeyDown(event) {
	controller.onKeyDown(event);
	// When a key is pressed, set the content of the text item:
	text.content = 'The ' + event.key + ' key was pressed!';
}