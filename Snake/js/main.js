//(function(se) {
//	se.Step = 1; // 1 second update
//	se.BlockScale = 0.5;
//
//	se.Directions = {
//		LEFT: new Point(-1, 0),
//		UP: new Point(0, -1),
//		RIGHT: new Point(1, 0),
//		DOWN: new Point(0, 1)
//	};
//})(window.se = window.se || {});
//
//console.log("main.js");

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