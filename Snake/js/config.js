var dir = {
   img:"img/"
}
var config = {
   container: {
      id: "sx-engine",
      width: 500,
      height: 500
   },
   obstacleClass: "sx-engine-obstacle",
	params: {
		block: {
			size: 1
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
		dir:"img/",
		ext: ".png",
		pawn: {
			left: {
				move: ["pawn-mv-l01", "pawn-mv-l02"]
			},
			up: {
				stand: "pawn-st-u",
				move: ["pawn-mv-u01", "pawn-mv-u02"]
			},
			right:
			{
				move: ["pawn-mv-r01", "pawn-mv-r02"]},
			down: {
				stand: "pawn-st-d",
				move: ["pawn-mv-d01", "pawn-mv-d02"]
			}
		},
		collectibles: ["collectible-01", "collectible-02", "collectible-03", "collectible-04"]
	}
};

function addImage(name) {
    var img = document.createElement("IMG");
    img.setAttribute('src', config.img.dir + name + config.img.ext);
    img.setAttribute('id', name);
    var container = document.getElementById('images');
    container.appendChild(img);
}
for(var dir in config.img.pawn){
    if(config.img.pawn[dir].stand)
        addImage(config.img.pawn[dir].stand);

    config.img.pawn[dir].move.map(function(name){
        addImage(name);
    });
}

config.img.collectibles.map(function(name){
    addImage(name);
});