/**
 * Created by Anry on 25.10.2014.
 */

define([
	"../se"
], function (se) {
	console.log('controller.js');
	se.Controller = function() {
		this.pawn = null;
		this.controls = null;
	};

	se.Controller.prototype.onInput = function(_event) {
		var controls = this.controls.filter(function(o) {
			return (o.keys.indexOf(_event.key) != -1);
		});
		var control = controls[0];
		control.action(control.params);
	};

	se.Controller.prototype.possess = function(_pawn) {
		this.pawn = _pawn;
		_pawn.controller = this;
	}
})