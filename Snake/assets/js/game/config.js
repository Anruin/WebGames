define(function () {
	var dir = {
		img: "img/"
	}
	var config = {
		container: {
			id: "sx-engine",
			width: 500,
				height: 500
			},
			obstacleClass: "sx-engine-obstacle",
			params: {
				path: {
					length: 100,
					firstLength: 300,
					strokeColor: '#6d6d6d',
					strokeWidth: 5,
					strokeCap: 'round'
				},
				collectible: {
					height: 100,
					offset: {
						x: 0,
						y: 35
					}
				},
				actor: {
					interval: 50,
					velocity: 0.021
				},
				field: {
					width: 100,
					height: 100
				},
				time: {
					update: {
						interval: 500
					}
				}
			},
			img: {
				dir: "assets/img/",
				ext: ".png",
				pawn: {
				left: {
					move: ["pawn-mv-l01", "pawn-mv-l02"]
				},
				up: {
					stand: "pawn-st-u",
					move: ["pawn-mv-u01", "pawn-mv-u02"]
				},
				right: {
					move: ["pawn-mv-r01", "pawn-mv-r02"]
				},
				down: {
					stand: "pawn-st-d",
					move: ["pawn-mv-d01", "pawn-mv-d02"]
				}
			},
			collectibles: ["gift-2-1", "gift-2-2", "gift-2-3"],
			followers: ["collectible-01", "collectible-02", "collectible-03", "collectible-04"]
		}
	};

//(function(se) {
//	se.Directions = {
//		LEFT: new Point(-1, 0),
//		UP: new Point(0, -1),
//		RIGHT: new Point(1, 0),
//		DOWN: new Point(0, 1)
//	};
//})
	console.log('config.js');
	return config;
})