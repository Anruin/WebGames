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
            stand: dir.img + "front-stand.png",
            move: [dir.img + "front-move-01.png", dir.img + "front-move-02.png"]
         },
         up: {
            stand: dir.img + "back-stand.png",
            move: [dir.img + "back-move-01.png", dir.img + "back-move-02.png"]
         },
         left: {
            move: [dir.img + "left-move-01.png", dir.img + "left-move-02.png"]
         },
         right: {
            move: [dir.img + "right-move-01.png", dir.img + "right-move-02.png"]
         }
      },
      food: [dir.img + "food-01.png", dir.img + "food-02.png", dir.img + "food-03.png", dir.img + "food-04.png"]
   }
};
