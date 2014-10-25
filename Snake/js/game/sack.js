/**
 * Created by Anry on 25.10.2014.
 */
console.log('sack.js');
(function(se, paper) {
	se.Sack = function() {
		/**
		 * Sack
		 * @type {se.Sack}
		 */
		this.next = null;
	}
	se.$extend(se.Sack, se.Actor);

	se.Sack.prototype.update = function() {
		this.move(this.velocity);
		se.Actor.prototype.update.call(this);
	}
})(window.se = window.se || {}, paper);