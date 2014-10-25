var dir = {
   img:"img/"
}
var config = {
   container: {
      id: "sx-game",
      width: 500,
      height: 500
   },
   obstacleClass: "sx-game-obstacle",
	params: {
		block: {
			size: 1
		},
		snake: {
			length: {
				start: 3,
				max: 10
			},
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
      snake: {
         down: {
            stand: dir.img + "pawn-st-d.png",
            move: [dir.img + "pawn-mv-d01.png", dir.img + "pawn-mv-d02.png"]
         },
         up: {
            stand: dir.img + "pawn-st-u.png",
            move: [dir.img + "pawn-mv-u01.png", dir.img + "pawn-mv-u02.png"]
         },
         left: {
            move: [dir.img + "pawn-mv-l01.png", dir.img + "pawn-mv-l02.png"]
         },
         right: {
            move: [dir.img + "pawn-mv-r01.png", dir.img + "pawn-mv-r02.png"]
         }
      },
      food: [dir.img + "collectible-01.png", dir.img + "collectible-02.png", dir.img + "collectible-03.png", dir.img + "collectible-04.png"]
   }
};
