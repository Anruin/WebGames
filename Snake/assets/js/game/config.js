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
	var WASDController = [
		{
			keys: ['a', 'ф', 'left', 'ArrowLeft'],
			func: 'turn',
			params: {direction: directions.left, name: "left"}
		}, {
			keys: ['w', 'ц', 'up', 'ArrowUp'],
			func: 'turn',
			params: {direction: directions.up, name: "up"}
		}, {
			keys: ['d', 'в', 'right', 'ArrowRight'],
			func: 'turn',
			params: {direction: directions.right, name: "right"}
		}, {
			keys: ['s', 'ы', 'down', 'ArrowDown'],
			func: 'turn',
			params: {direction: directions.down, name: "down"}
		}
	];
	//TODO: Optimize
	var images = {
		lives: [{empty:["empty-heart"]}, {full:["heart"]}],
		collectible: [
			{idle: ["gift-2-1", "gift-2-2", "gift-2-3"]},
			{idle: ["gift-3-1", "gift-3-2", "gift-3-3"]},
			{idle: ["gift-4-1", "gift-4-2", "gift-4-3"]},
			{idle: ["gift-5-1", "gift-5-2", "gift-5-3"]}
		],
		follower: [
			{idle:["sack-01"]},
			{idle:["sack-02"]},
			{idle:["sack-03"]},
			{idle:["sack-04"]}
		],
		npc: [
			{
				active: ["npc-animation-1-1", "npc-animation-1-2"],
				accept1: ["npc-accept-1-1-1", "npc-accept-1-1-2"],
				accept2: ["npc-accept-1-2-1", "npc-accept-1-2-2"],
				accept3: ["npc-accept-1-3-1", "npc-accept-1-3-2"],
				accept4: ["npc-accept-1-4-1", "npc-accept-1-4-2"]
			},
			{
				active: ["npc-animation-2-1", "npc-animation-2-2"],
				accept1: ["npc-accept-2-1-1", "npc-accept-2-1-2"],
				accept2: ["npc-accept-2-2-1", "npc-accept-2-2-2"],
				accept3: ["npc-accept-2-3-1", "npc-accept-2-3-2"],
				accept4: ["npc-accept-2-4-1", "npc-accept-2-4-2"]
			},
			{
				active: ["npc-animation-3-1", "npc-animation-3-2"],
				accept1: ["npc-accept-3-1-1", "npc-accept-3-1-2"],
				accept2: ["npc-accept-3-2-1", "npc-accept-3-2-2"],
				accept3: ["npc-accept-3-3-1", "npc-accept-3-3-2"],
				accept4: ["npc-accept-3-4-1", "npc-accept-3-4-2"]
			},
			{
				active: ["npc-animation-4-1", "npc-animation-4-2"],
				accept1: ["npc-accept-4-1-1", "npc-accept-4-1-2"],
				accept2: ["npc-accept-4-2-1", "npc-accept-4-2-2"],
				accept3: ["npc-accept-4-3-1", "npc-accept-4-3-2"],
				accept4: ["npc-accept-4-4-1", "npc-accept-4-4-2"]
			}
		],
		pawn: [
			{move: ["pawn-mv-l01", "pawn-mv-l02"], idle: ["pawn-st-d"]},
			{move: ["pawn-mv-u01", "pawn-mv-u02"], idle: ["pawn-st-u"]},
			{move: ["pawn-mv-r01", "pawn-mv-r02"], idle: ["pawn-st-d"]},
			{move: ["pawn-mv-d01", "pawn-mv-d02"], idle: ["pawn-st-d"]}
		],
		enemy: [
			{move: ["bomb-01", "bomb-02"], active: ["bomb-explosion-01", "bomb-explosion-02"], idle: ["pit"]}
		]
	};
	var config = {
		debug: true,
		container: {
			id: "sx-engine"
		},
		obstacle: {
			class: "game-obstacle"
		},
		levels: [
			{
				name: "level_5",
				scroll: 3000,
				score: 2,
				pawn: {
						points: [50, 78]
				},
				collectible: {
					points: [[49.4, 51], [13.9, 48.5]],
					img: images.collectible[0].idle
				},
				collectibles: images.collectible[0].idle //TODO: Delete
				//give: {
				//	lives: 1
				//}
			},
			{
				name: "level_4",
				scroll: 1500,
				score: 4,
				pawn: {
					points: [3.1, 55.1]
				},
				collectible: {
					points: [[17.1, 54.3], [90, 54.2]],
					img: images.collectible[1].idle
				},
				enemy: {
					points: [
						[[30.6, 25.0], [30.6, 75.0]],
						[[49.9, 25.0], [49.9, 75.0]],
						[[70.8, 25.0], [70.8, 75.0]]
					]
				},
				collectibles: images.collectible[1].idle, //TODO: Delete
				//give: {
				//	lives: 1
				//},
				bulbs: [
					[[14.1, 0],[21.6, 100]],
					[[35.9, 0],[41.3, 100]],
					[[56.9, 0],[64.6, 100]],
					[[78.9, 0],[85.6, 100]]
				]
			},
			{
				name: "level_3",
				scroll: 1500,
				score: 6,
				pawn: {
					points: [43.2, 56.1]
				},
				collectible: {
					points: [[16.7, 33.3], [82.1, 33.3]],
					img: images.collectible[2].idle
				},
				enemy: {
					points: [
						[[31.0, 67.0], [31.0, 8.0]],
						[[49.7, 96.0], [49.7, 72.0]],
						[[68.0, 67.0], [66.5, 8.0]]
					]
				},
				collectibles: images.collectible[2].idle //TODO: Delete
				//give: {
				//	lives: 1
				//}
			},
			{
				name: "level_2",
				scroll: 1500,
				score: 8,
				pawn: {
					points: [48.6, 27.6]
					//points: [59.3, 39.7]
				},
				collectible: {
					points: [[35.0, 69.6], [64.2, 70.0]],
					img: images.collectible[3].idle
				},
				enemy: {
					points: [
						[[49.5, 83.0], [49.5, 63.0]],
						[[30.9, 95.5], [66.0, 95.5]],
						[[31.6, 41.2], [66.5, 41.2]]
					]
				},
				collectibles: images.collectible[3].idle //TODO: Delete
				//give: {
				//	lives: 1
				//}
			},
			{
				name: "level_1",
				scroll: 1500,
				score: 16,
				pawn: {
					points: [8,80]
				},
				collectible: {
					points: [[35.0, 69.6], [64.2, 70.0]],
					img: images.collectible[3].idle
				},
				enemy: {
					points: [
						[[29.3, 42.2], [0.8, 42.2]],
						[[68.3, 40.8], [95.5, 40.8]],
						[[50.5, 7.8], [50.5, 21.3]],
						[[38.5, 58.8], [38.5, 96.4]],
						[[59.6, 57.7], [59.6, 97.8]]
					],
					appearsNum: 5
				}
			},
			{
				name: "level_6", //finish, game over
				scroll: 1000
			}
		],
		params: {
			path: {
				length: 25,
				firstLength: 25,
				strokeColor: '#6d6d6d',
				strokeWidth: 2,
				strokeCap: 'round',
				offset: {
					right: {x: 14, y: 0},
					up: {x: 17, y: 0},
					left: {x: -15, y: 0},
					down: {x: 17, y: 0}
				}
			},
			pawn: {
				general:{
					loop: true,
					scale: 0.22857,
					speed: 2,
					duration: 0.05,
					controls: WASDController,
					obstaclesBalk: true
				},
				variant:[{
					name: "santa",
					initState: "down",
					states: [
						{name: "down", img: images.pawn[3]},
						{name: "left", img: images.pawn[0]},
						{name: "up", img: images.pawn[1]},
						{name: "right", img: images.pawn[2]}
					]
				}]
			},
			follower: {
				scale: 0.25
			},
			collectible: {
				general: {
					appearsNum: 1,
					scale: 0.2,
					levels: [0, 1, 2, 3],
					give: {
						score: 1
					},
					height: 100,
					offset: {
						x: 0,
						y: 15
					},
					variantPerLevel: true,
					uniqueImage: true
				},
				variant: images.collectible
			},
			npc: {
				general: {
					loop: true,
					scale: 0.28,
					appearsNum: 3,
					levels: [4],
					duration: 0.25,
					respawn: 10,
					randomImage: true
				},
				variant: [
					{
						name: "npc-1",
						initState: "active",
						states: [
							{name: "active", img: images.npc[0].active},
							{name: "accept", img: {1: images.npc[0].accept1, 2: images.npc[0].accept2, 3: images.npc[0].accept3, 4: images.npc[0].accept4}}
						]
					},
					{
						name: "npc-2",
						initState: "active",
						states: [
							{name: "active", img: images.npc[1].active},
							{name: "accept", img: {1: images.npc[1].accept1, 2: images.npc[1].accept2, 3: images.npc[1].accept3, 4: images.npc[1].accept4}}
						]
					},
					{
						name: "npc-3",
						initState: "active",
						states: [
							{name: "active", img: images.npc[2].active},
							{name: "accept", img: {1: images.npc[2].accept1, 2: images.npc[2].accept2, 3: images.npc[2].accept3, 4: images.npc[2].accept4}}
						]
					},
					{
						name: "npc-4",
						initState: "active",
						states: [
							{name: "active", img: images.npc[3].active},
							{name: "accept", img: {1: images.npc[3].accept1, 2: images.npc[3].accept2, 3: images.npc[3].accept3, 4: images.npc[3].accept4}}
						]
					}
				]
			},
			enemy: {
				general: {
					loop: true,
					scale: 0.22857,
					appearsNum: 3,
					levels: [1, 2, 3, 4],
					take:{
						score: 2,
						lives: 1
					},
					step: 1
				},
				variant: [
					{
						name: "bomb",
						initState: "move",
						initCommand: "move",
						states: [
							{
								name: "move",
								img: images.enemy[0].move,
								duration: 0.05,
								next: {
									if: "intersects",
									state: "active",
									command: "active",
									velocity: null
								}
							},
							{
								name: "active",
								duration: 1,
								img: images.enemy[0].active,
								next: {
									if: "auto",
									state: "idle",
									command: "idle",
									duration: 2000
								}
							},
							{
								name: "idle",
								loop: false,
								img: images.enemy[0].idle
							}
						]
					}
				]
			}
		},
		images: images,
		img: {
			dir: window.en ? "../assets/img/" : "./assets/img/",
			ext: ".png"
		}
	};
	return config;
})