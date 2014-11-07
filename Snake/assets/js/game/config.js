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
			{move: ["pawn-mv-l01", "pawn-mv-l02"]},
			{move: ["pawn-mv-u01", "pawn-mv-u02"], idle: ["pawn-st-u"]},
			{move: ["pawn-mv-r01", "pawn-mv-r02"]},
			{move: ["pawn-mv-d01", "pawn-mv-d02"], idle: ["pawn-st-d"]}
		],
		enemy: [
			{move: ["bomb-01", "bomb-02"], active: ["bomb-explosion"], idle: ["pit"]}
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
				spawn: [50,57],
				collectible: [[35,55], [60,65]],
				collectibles: images.collectible[0].idle,
				give: {
					lives: 1
				}
			},
			{
				name: "level_4",
				scroll:1500,
				score: 4,
				spawn: [50,57],
				enemy: [
					[[14,25],[14,60]],
					[[20,25],[20,60]],
					[[26,25],[26,60]]
				],
				collectibles: images.collectible[1].idle,
				give: {
					lives: 1
				}
			},
			{
				name: "level_3",
				scroll:1500,
				score: 6,
				spawn: [50,82],
				collectibles: images.collectible[2].idle,
				give: {
					lives: 1
				}
			},
			{
				name: "level_2",
				scroll:1500,
				score: 8,
				spawn: [8,80],
				collectibles: images.collectible[3].idle,
				give: {
					lives: 1
				}
			},
			{
				name: "level_1",
				scroll:1500,
				score: 16,
				spawn: [8,80]
			},
			{
				name:"level_6", //finish, game over
				scroll:1000
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
					controls: WASDController
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
					}
				},
				variant: images.collectible
			},
			npc: {
				general: {
					loop: true,
					scale: 0.4,
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
					duration: 0.05,
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
						states: images.enemy[0]
					}
				]
			}
		},
		images: images,
		img: {
			dir: "assets/img/",
			ext: ".png"
		}
	};
	return config;
})