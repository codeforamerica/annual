$(function(){
	$('.cfalogo').hover(
	function() {
		$('nav').show();
	});





  var setSize = function(){
    var h = $(window).height(),
        w = $(window).width();

    $(".quote").css({width:w, height:h, "margin-top":(h/2)-100});
  }

  setSize();
  $(window).resize(setSize);



});



