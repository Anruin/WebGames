define(function () {
	var dir = {
		img: "img/"
	}
	var directions = {
		left: new paper.Point(-1, 0),
		up: new paper.Point(0, -1),
		right: new paper.Point(1, 0),
		down: new paper.Point(0, 1)
	};
	var config = {
		debug: false,
		container: {
			id: "sx-engine"
		},
		obstacle: {
			class: "game-obstacle"
		},
		levels: [
			{name: "level_5", score: 3, spawn: [670,350], collectibles: ["gift-2-1", "gift-2-2", "gift-2-3"]},
			{name: "level_4", score: 6, spawn: [670,350], collectibles: ["gift-3-1", "gift-3-2", "gift-3-3"]},
			{name: "level_3", score: 9, spawn: [670,550], collectibles: ["gift-4-1", "gift-4-2", "gift-4-3"]},
			{name: "level_2", score: 12, spawn: [100,100], collectibles: ["gift-5-1", "gift-5-2", "gift-5-3"]},
			{name: "level_1", score: 0, spawn: [100,100]}
		],
		finish: {name:"level_6"},
		params: {
			path: {
				length: 25,
				firstLength: 25,
				strokeColor: '#6d6d6d',
				strokeWidth: 2,
				strokeCap: 'round',
				offset:{
					right: {x:22, y:0},
					up: {x:30, y:0},
					left: {x:-22, y:0},
					down: {x:30, y:0}
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
				scale: 0.4,
				speed: 2,
				duration: 0.25,
				controls: [
					{
						keys: ['a', 'left'],
						func: 'turn',
						params: { direction: directions.left, name: "left" }
					}, {
						keys: ['w', 'up'],
						func: 'turn',
						params: { direction: directions.up, name: "up" }
					}, {
						keys: ['d', 'right'],
						func: 'turn',
						params: { direction: directions.right, name: "right" }
					}, {
						keys: ['s', 'down'],
						func: 'turn',
						params: { direction: directions.down, name: "down" }
					}
				]
			},
			follower:{
				scale: 0.25
			},
			npc: {
				scale: 0.4,
				levels: [4],
				duration: 0.25,
				variant: [{
					animation: ["npc-animation-1-1", "npc-animation-1-2"],
					accept: ["npc-accept-1-1", "npc-accept-1-2", "npc-accept-1-3", "npc-accept-1-4"]
				},
					{
						animation: ["npc-animation-2-1", "npc-animation-2-2"],
						accept: ["npc-accept-2-1", "npc-accept-2-2", "npc-accept-2-3", "npc-accept-2-4"]
					},
					{
						animation: ["npc-animation-3-1", "npc-animation-3-2"],
						accept: ["npc-accept-3-1", "npc-accept-3-2", "npc-accept-3-3", "npc-accept-3-4"]
					},
					{
						animation: ["npc-animation-4-1", "npc-animation-4-2"],
						accept: ["npc-accept-4-1", "npc-accept-4-2", "npc-accept-4-3", "npc-accept-4-4"]
					}]
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