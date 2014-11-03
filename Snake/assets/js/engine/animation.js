/**
 * Created by Anry on 25.10.2014.
 */
define([
	"../se"
], function (se) {
	se.Animation = function () {
		// Animation name
		this.name = '';
		// Whether to loop or not
		this.loop = true;
		// Animation timer
		this.timer = 0.0;
		// Animation frames
		this.frames = [];
		// Active frame
		this.activeFrameIndex = 0;
	};

	/**
	 * Updates animation and returns active frame
	 * @param _dt delta time
	 */
	se.Animation.prototype.update = function (_dt) {
		if (se.$debug) console.log('Animation update', this.activeFrameIndex);

		if (this.frames.length === 0)
			return null;

		// Active frame
		var activeFrame = this.frames[this.activeFrameIndex];

		// Delay before frame changes
		if (this.timer > 0) {
			this.timer -= _dt;
			return false;
		} else {
			// Increase frame index
			this.activeFrameIndex++;
			if (this.activeFrameIndex >= this.frames.length)
				this.activeFrameIndex = 0;
			// Reset timer for next frame
			this.timer = activeFrame.duration;
			// Return active frame texture
			return activeFrame.image;
		}
	};
});