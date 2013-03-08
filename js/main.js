$(function(){
	$('.cfalogo').hover(
	function() {
		$('nav').show();
	});





  var setSize = function(){
    var h = $(window).height(),
        w = $(window).width();

    $(".quote").css({width:w, height:h});
  }

  setSize();
  $(window).resize(setSize);



});



