define([
	"./test/test",
	"./game/config"
  ], function(test, config) {

	$('body,html').stop(true,true).animate({
		scrollTop: $('#level_5').offset().top
	}, config.levels[0].scroll);
	return test;
});
