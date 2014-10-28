/**
 * Created by Anry on 25.10.2014.
 */
console.log('collectible.js');
(function(se, paper) {
	se.Collectible = function () {
	};
	se.$extend(se.Collectible, se.Actor);
})(window.se = window.se || {}, paper);