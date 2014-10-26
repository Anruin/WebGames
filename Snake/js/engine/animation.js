/**
 * Created by Anry on 25.10.2014.
 */
console.log('animation.js');
(function(se, paper) {
	se.Animation = function() {
		this.name = '';
		this.loop = true;
		this.timer = 0.0;
		this.frames = [];
		this.activeFrame = null;
	};

	/**
	 * Updates animation and returns active frame
	 * @param _dt
	 */
	se.Animation.prototype.update = function (_dt) {
		// Find frames with time greater than current animation time
		var timer = this.timer;
		var filtered = this.frames.filter(function(o) {
			return (o.time > timer);
		});
		// Get first frame found, if none, go to start
		if (filtered.length == 0) {
			if (this.loop) {
				this.activeFrame = this.frames[0];
				this.timer = 0.0;
			}
		} else {
			this.activeFrame = filtered[0].image;
			this.timer += _dt;
		}
		return this.activeFrame;
	};

})(window.se = window.se || {});