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
		obstacle: {
			class: "game-obstacle"
		},
		params: {
			path: {
				length: 50,
				firstLength: 50,
				strokeColor: '#6d6d6d',
				strokeWidth: 2,
				strokeCap: 'round',
				offset:{
					right: {x:25,y:0},
					up: {x:33,y:0},
					left: {x:-25,y:0},
					down: {x:33,y:0}
				}
			},
			collectible: {
				scale: 0.2,
				height: 100,
				offset: {
					x: 0,
					y: 15
				}
			},
			pawn: {
				scale: 0.4
			},
			follower:{
				scale: 0.25
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
	return config;
})