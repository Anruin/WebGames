/**
 * Created by Anry on 25.10.2014.
 */
define([
	"../se",
	"./sack",
	"../engine/common",
	"../engine/pawn"
], function (se) {
	console.log('santa.js');
	se.Santa = function() {
		this.velocity = null;
		/**
		 * Sack
		 * @type {se.Sack}
		 */
		this.sack = null;
		se.Pawn.call(this);
	};

	se.$extend(se.Santa, se.Pawn);

	se.Santa.prototype.velocity = null;

	se.Santa.prototype.update = function() {
		console.log('Move velocity: ' + this.velocity);
		this.move(this.velocity);
		se.Pawn.prototype.update.call(this);
	};

	se.Santa.prototype.turn = function(_params) {
		console.log('Was velocity: ' + this.velocity);
		this.velocity = _params.direction;
		console.log('Set velocity: ' + this.velocity);
	};

	function clone(obj) {
		var copy;

		// Handle the 3 simple types, and null or undefined
		if (null == obj || "object" != typeof obj) return obj;

		// Handle Date
		if (obj instanceof Date) {
			copy = new Date();
			copy.setTime(obj.getTime());
			return copy;
		}

		// Handle Array
		if (obj instanceof Array) {
			copy = [];
			for (var i = 0, len = obj.length; i < len; i++) {
				copy[i] = clone(obj[i]);
			}
			return copy;
		}

		// Handle Object
		if (obj instanceof Object) {
			copy = {};
			for (var attr in obj) {
				if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
			}
			return copy;
		}

		throw new Error("Unable to copy obj! Its type isn't supported.");
	}
})