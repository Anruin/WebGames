/**
 * Created by Anry on 25.10.2014.
 */

define([
	"../se"
], function (se) {
	console.log('controller.js');
	se.Controller = function(pawn) {
		this.pawn = pawn;
		this.controls = null;
	};

	se.Controller.prototype.onInput = function(_key) {
		var control = this.controls.filter(function(o) {
			return (o.keys.indexOf(_key) != -1);
		})[0];

		this.pawn.action(control.func, control.params);
	};

	se.Controller.prototype.possess = function(_pawn) {
		this.pawn = _pawn;
		_pawn.controller = this;
	}
})