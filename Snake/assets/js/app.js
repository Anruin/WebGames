define([
	"./test/test",
	"./game/config"
  ], function(test, config) {

	$('html body').animate({
		scrollTop: $('#level_5').offset().top
	}, config.levels[0].scroll);
	return test;
});
