/**
 * Created by Anry on 25.10.2014.
 */
define([
	"../se"
], function (se) {
	console.log('animation.js');
	se.Animation = function () {
		this.name = '';
		this.loop = true;
		this.timer = 0.0;
		this.frames = [];
		this.activeFrameIndex = 0;
	};

	/**
	 * Updates animation and returns active frame
	 * @param _dt
	 */
	se.Animation.prototype.update = function (_dt) {
		if (se.$debug) console.log('Animation update', this.activeFrameIndex);

		if (this.frames.length === 0)
			return null;

		var activeFrame = this.frames[this.activeFrameIndex];

		if (this.timer > 0) {
			this.timer -= _dt;
			return false;
		} else {
			this.activeFrameIndex++;
			if (this.activeFrameIndex >= this.frames.length)
				this.activeFrameIndex = 0;
			this.timer = activeFrame.duration;
			return activeFrame.image;
		}
		return this.activeFrame;
	};
})
