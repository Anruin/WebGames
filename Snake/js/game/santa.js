/**
 * Created by Anry on 25.10.2014.
 */
console.log('santa.js');
(function(se, paper) {

	se.Santa = function() {
		/**
		 * Sack
		 * @type {se.Sack}
		 */
		this.sack = null;
	};
	se.Santa.prototype.velocity = null;
	se.$extend(se.Santa, se.Pawn);

	se.Santa.prototype.update = function() {
		console.log('Move velocity: ' + this.velocity);
		this.move(this.velocity);
		se.Pawn.prototype.update.call(this);
	};

	se.Santa.prototype.turn = function(_params) {
		this.velocity = _params.direction;
		console.log('Set velocity: ' + this.velocity);
	};

})(window.se = window.se || {}, paper);