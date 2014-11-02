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
	//TODO: Optimize
	var images = {
		collectible: [
			{normal: ["gift-2-1", "gift-2-2", "gift-2-3"]},
			{normal: ["gift-3-1", "gift-3-2", "gift-3-3"]},
			{normal: ["gift-4-1", "gift-4-2", "gift-4-3"]},
			{normal: ["gift-5-1", "gift-5-2", "gift-5-3"]}
		],
		follower: [
			{normal:["collectible-01"]},
			{normal:["collectible-02"]},
			{normal:["collectible-03"]},
			{normal:["collectible-04"]}
		],
		npc: [{
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
			}
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
			{name: "level_5", scroll:3000, score: 2, spawn: [50,57], collectibles: images.collectible[0].normal},
			{name: "level_4", scroll:1500, score: 4, spawn: [50,57], collectibles: images.collectible[1].normal},
			{name: "level_3", scroll:1500, score: 6, spawn: [50,82], collectibles: images.collectible[2].normal},
			{name: "level_2", scroll:1500, score: 8, spawn: [8,80], collectibles: images.collectible[3].normal},
			{name: "level_1", scroll:1500, score: 16, spawn: [8,80]},
			{name:"level_6", scroll:1000} //finish, game over
		],
		params: {
			path: {
				length: 25,
				firstLength: 25,
				strokeColor: '#6d6d6d',
				strokeWidth: 2,
				strokeCap: 'round',
				offset:{
					right: {x:14, y:0},
					up: {x:17, y:0},
					left: {x:-15, y:0},
					down: {x:17, y:0}
				}
			},
			collectible: {
				appearsNum: 1,
				scale: 0.2,
				levels: [0, 1, 2, 3],
				score: 1,
				height: 100,
				offset: {
					x: 0,
					y: 15
				}
				//img: images.collectible
			},
			pawn: {
				scale: 0.22857,
				speed: 2,
				duration: 0.05,
				controls: [
					{
						keys: ['a', 'ф', 'left'],
						func: 'turn',
						params: { direction: directions.left, name: "left" }
					}, {
						keys: ['w', 'ц', 'up'],
						func: 'turn',
						params: { direction: directions.up, name: "up" }
					}, {
						keys: ['d', 'в', 'right'],
						func: 'turn',
						params: { direction: directions.right, name: "right" }
					}, {
						keys: ['s', 'ы', 'down'],
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
				appearsNum: 3,
				levels: [4],
				duration: 0.25,
				img: images.npc
			},
			enemy: {
				scale: 0.4,
				appearsNum: 3,
				levels: [1,2,3,4],
				img: images.npc
			}
		},
		images: images,
		//TODO: Move to images:
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
			}
		}
	};
	return config;
})