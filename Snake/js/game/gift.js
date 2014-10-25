/**
 * Created by Anry on 25.10.2014.
 */
console.log('gift.js');
(function(se, paper) {

	se.Gift = function() {
	};

	se.$extend(se.Gift, se.Collectible);

	se.Gift.prototype.update = function() {
		se.Collectible.prototype.update.call(this);
	}
})(window.se = window.se || {}, paper);