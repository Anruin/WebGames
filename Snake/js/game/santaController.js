/**
 * Created by Anry on 25.10.2014.
 */
console.log('santaController.js');
(function(se, paper) {
	se.SantaController = function() {
		this.pawn = null;
		this.controls = null;
	};

	se.SantaController.prototype.onKeyDown = function(_event) {
		this.controls.filter();
	};

})(window.se = window.se || {});

var controller = new se.SantaController();

controller.controls = [
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


function onKeyDown(event) {
	if (event.key == "up") {
		game.pawn.turn(se.Directions.UP);
	} else if (event.key == "down" || event.key == "s") {
		game.pawn.turn(se.Directions.DOWN);
	} else if (event.key == "left" || event.key == "a") {
		game.pawn.turn(se.Directions.LEFT);
	} else if (event.key == "right" || event.key == "d") {
		game.pawn.turn(se.Directions.RIGHT);
	}
	// When a key is pressed, set the content of the text item:
	text.content = 'The ' + event.key + ' key was pressed!';
}