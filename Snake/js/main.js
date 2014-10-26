(function(se) {
	se.Debug = true;
	se.Step = 1; // 1 second update
	se.BlockScale = 0.5;

	se.Directions = {
		LEFT: new Point(-1, 0),
		UP: new Point(0, -1),
		RIGHT: new Point(1, 0),
		DOWN: new Point(0, 1)
	};

	window.game = new se.Game();
})(window.se = window.se || {});

console.log("main.js");

// Create a Paper.js Path to draw a line into it:
var path = new Path();
// Give the stroke a color
path.strokeColor = 'black';
var start = new Point(100, 100);
// Move to start and draw a line from there
path.moveTo(start);
// Note the plus operator on Point objects.
// PaperScript does that for us, and much more!
path.lineTo(start + [ 100, -50 ]);


view.onFrame = function(event) {
	game.update(event);
};

// Create a centered text item at the center of the view:
var text = new PointText({
	point: view.center,
	content: 'Key press detection.',
	justification: 'center',
	fontSize: 15
});

function onKeyUp(event) {
	// When a key is released, set the content of the text item:
	text.content = 'The ' + event.key + ' key was released!';
}

/**
 * Called when window is re-sized
 * @param event
 */
function onResize(event) {
}