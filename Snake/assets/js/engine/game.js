/**
 * Created by Anry on 25.10.2014.
 */

define([
	"../se",
	"../game/config",
	"../helpers/helpers",
	"../game/santa_scene",
	"./player",
	"../engine/controller",
	"../engine/common"
], function (se, config, helpers) {
	/**
	 * Game class
	 * @constructor
	 */
	se.Game = function () {
		// Game levels
		this.scenes = [];
		// Current game level object
		this.activeScene = null;
		// Active players
		this.players = [];
		//
		this.level = null;
	};

	/**
	 * Game initialization function
	 */
	se.Game.prototype.initBackgroundSound = function() {
		game.background = window.sound('background-64');
		game.background.onended = function(){
			if(paper.project)
				game.initBackgroundSound();
		};
	};
	se.Game.prototype.create = function () {
		game.initBackgroundSound();

		$.fn.fullpage.setAllowScrolling(false);
		$.fn.fullpage.setKeyboardScrolling(false);
		document.getElementById('sx-game').style.display = "block";

		var scene = new se.SantaScene(game);
		game.scenes = [scene];
		game.activeScene = game.scenes[0];

		var player = new se.Player();

		game.activeScene.level = config.levels[0];
		$('#santa_to_hide').hide();
		game.initLevel();

		var controller = new se.Controller(game.activeScene.mainPawn);
		game.activeScene.mainPawn.controller = controller;
		se.setDebugTools();

		paper.tool.onKeyDown = function(event){
			//console.log('keydown');
			controller.onInput(event.key);
			se.debugTools.onKeyDown(event);
		};
		paper.tool.onKeyUp = function (event) {
			//console.log('keyup');
			//controller.onCessation(event.key);
		};
		paper.tool.onMouseMove = function (event) {
			se.debugTools.onMouseMove(event);
		};
		paper.tool.onMouseDown = function (event) {
			se.debugTools.onMouseDown(event);
			game.onMouseDown(event);
		};
		paper.tool.onMouseDrag = function (event) {
			var pawnPoint = game.activeScene.mainPawn.item.position;
			//if($.browser.device){
			var xDist = event.point.x - pawnPoint.x;
			var yDist = event.point.y - pawnPoint.y;

			var key;
			if(Math.abs(xDist) > Math.abs(yDist)){
				key = xDist > 0 ? "right" : "left";
			}
			else{
				key = yDist > 0 ? "down" : "up";
			}

			if(game.touchWalk)
				clearInterval(game.touchWalk);

			game.touchWalk = setInterval(function(){
				controller.onInput(key);
			}, 500);
			controller.onInput(key);

			//setInterval(function(){
			//
			//})
			//}
		};

		paper.tool.onMouseUp = function (event) {
			clearInterval(game.touchWalk);
			game.touchWalk = null;
		};

		game.resizeDebounce = _.debounce(function(isNotSetBulbs){
			game.activeScene.initObstacles();

			var toReplace = [game.activeScene.pawns, game.activeScene.collectibles, game.activeScene.npc];
			toReplace.map(function(array){
				array.map(function(actor){
					if(helpers.isIntersects(game.activeScene.obstacles, actor))
						helpers.setNotIntersectRandomPoint(actor, game.activeScene.obstacles);
				});
			});
			if(!isNotSetBulbs)
				game.setBulbs ();
			console.log("react to resize");
		}, 500);
		paper.project.view.onResize = game.resizeDebounce;
		setTimeout(game.resizeDebounce, 1000);
	};

	/**
	 * Update game
	 * @param _dt
	 */
	se.Game.prototype.update = function (_dt) {
		if (se.debugTools)
			se.updateDebugTools();

		if(game.activeScene.mainPawn.controller)
			game.activeScene.mainPawn.controller.update(_dt);

		if (game.activeScene)
			game.activeScene.update(_dt);

		if (game.activeScene.level && game.activeScene.mainPawn.score == game.activeScene.level.score) {
			if(game.activeScene.collectibles.length || game.activeScene.npc.length)
				return;

			var newLvlIndex = config.levels.indexOf(game.activeScene.level) + 1;
			game.activeScene.level = config.levels[newLvlIndex];

		if(newLvlIndex >= config.levels.length - 1){
			setTimeout(function(){game.over("win")}, 1000);
			return;
		}

			game.initLevel();
		}
	};

	/**
	 * Level initialization
	 */
	se.Game.prototype.initLevel = function () {
		var indexLvl = config.levels.indexOf(game.activeScene.level);

		if(indexLvl == 4){
			$('#lastLevelModal').modal('show');
		}

		if(indexLvl == 0){
			game.activeScene.createActor("pawn", game.activeScene.pawns);
			game.activeScene.mainPawn = game.activeScene.pawns[0];
			game.activeScene.mainPawn.command = null;
			helpers.initLives();

			game.startLevel();
		}
		else {
			game.activeScene.mainPawn.turn(game.activeScene.mainPawn.controller.getByName("up").params);
			game.activeScene.mainPawn.command = "stay";
			helpers.clearActorsArray(game.activeScene.obstacles, true);

			if(game.activeScene.level.give){
				game.activeScene.mainPawn.lives += game.activeScene.level.give.lives;
				helpers.initLives();
			}

			//var debounceComplete = _.debounce(function() {
			//	game.startLevel();
			//	game.setBulbs();
			//}, 500);
			game.activeScene.prepared = false;
			game.isToStartLvl = true;
			var index = $('.game-level#' + game.activeScene.level.name).index();
			$.fn.fullpage.moveTo(index + 1);
			//$('body,html').stop(true,true).animate({
			//	scrollTop: $('#' + this.activeScene.level.name).offset().top
			//}, {
			//	duration: game.activeScene.level.scroll,
			//	complete: debounceComplete
			//});
		}
		helpers.clearActorsArray(game.activeScene.collectibles);
		helpers.clearActorsArray(game.activeScene.enemies);
		helpers.clearActorsArray(game.activeScene.toRemove);
		game.activeScene.nums = {};
	};

	se.Game.prototype.startLevel = function (){
		game.activeScene.initObstacles();

		if(game.activeScene.level.pawn){
			game.activeScene.mainPawn.item.position = helpers.getPointPixels(game.activeScene.level.pawn.points);
			if(helpers.isIntersects(game.activeScene.obstacles, game.activeScene.mainPawn))
				helpers.setNotIntersectRandomPoint(game.activeScene.mainPawn, game.activeScene.obstacles);
		}
		else
			helpers.setNotIntersectRandomPoint(game.activeScene.mainPawn.item.position, game.activeScene.obstacles);

		game.activeScene.prepared = true;
	};
	se.Game.prototype.over = function (status) {
		game.activeScene.mainPawn.item.position = [-1000,-1000];

		paper.project.clear();
		paper.project.remove();
		try{
			game.background.stop(0);
		}
		catch(e){
			console.log('cant stop background music: ');
			console.log(e);
		}

		document.getElementById('sx-game').style.display = "none";

		//$('body,html').stop(true,true).animate({
		//	scrollTop: $('#' + game.activeScene.level.name).offset().top
		//}, game.activeScene.level.scroll);
		$.fn.fullpage.moveTo(6);
		se.enable_scroll();
		$.fn.fullpage.setAllowScrolling(true);
		$.fn.fullpage.setKeyboardScrolling(true);

		if(status == "lose") {
			$('#gameOverModal').modal('show');
			var count, text;
			if(game.activeScene.level.name != "level_1"){
				count = config.levels[3].score - game.activeScene.mainPawn.score;
				text = window.en ? "COLLECT" : "СОБРАТЬ";
			}
			else{
				count = game.activeScene.mainPawn.followers.length + game.activeScene.collectibles.length;
				text = window.en ? "GIVE" : "РАЗДАТЬ";
			}
			var wordNum = window.en ? helpers.enducement(count, "GIFT", "GIFTS", "GIFTS") : helpers.enducement(count, "ПОДАРОК", "ПОДАРКА", "ПОДАРКОВ");

			$('#gift-count-text').html(text);
			$('.js-modal-gift-count').html(count);
			$('#gift-count-word').html(wordNum);
		}
		else if(status == "win"){
			window.sound("win");
			$('#gameWinModal').modal('show');
			$('#promo-code').val("promo");
		}
	};
	se.Game.prototype.setBulbs = function () {
		if(game.activeScene.bulbs && game.activeScene.bulbs.length)
			game.activeScene.bulbs.map(function(bulb){
				bulb.item.remove();
			});
		game.activeScene.bulbs = [];

		if(game.activeScene.level.name == "level_4"){
			game.activeScene.level.bulbs.map(function(bulb){
				var trigger = {};
				var rect = new paper.Rectangle(helpers.getPointPixels(bulb[0]), helpers.getPointPixels(bulb[1]));
				trigger.item = new paper.Path.Rectangle(rect);
				trigger.elem = ".level-4__text.text-" + (game.activeScene.bulbs.length + 1);
				trigger.isActive = false;
				game.activeScene.bulbs.push(trigger);
			});
		}
	};
	se.Game.prototype.onMouseDown = function (event) {
		if(game.activeScene.bulbs && game.activeScene.bulbs.length){
			var bulb = game.activeScene.bulbs.filter(function(bulb){
				return bulb.item.bounds.contains(event.point) && !bulb.isActive;
			})[0];
			if(bulb){
				$(bulb.elem).trigger("click");
				bulb.isActive = true;
				game.resizeDebounce(true);
			}
		}
	};
});
