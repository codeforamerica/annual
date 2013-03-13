$(function(){

  //shows nav when user hovers over the logo
  $(".cfalogo").hover(
	function() {
	  $("nav").fadeIn();
	});

  var height = $(window).height(),
    width = $(window).width();

  var setSize = function(){
    height = $(window).height();
    width = $(window).width();

    $(".quote").css({width:width, height:height});
    $(".story").css({width:width, "min-height":height});
    $("pagebg").css({width:width, height:height});
  }

  var onScroll = function(){
  	
    //hides nav when user starts to scroll
    if($(window).scrollTop() > 0) {
  	  $("nav").fadeOut();
    } else {
  	  $("nav").fadeIn();
    }
  
    $(".page").each(function(i, el){
      console.log(el, $(el).offset().top, $(el).offset().top+$(el).height(), $(window).scrollTop());
      if(($(el).offset().top <= $(window).scrollTop()) &&
         ($(el).offset().top+$(el).height() >= $(window).scrollTop())){
        //in transition 
      
        $("div.pagebg").css({opacity:0});
        $($("div.pagebg")[i]).css({opacity:1});
      }
    });
  }

  setSize();
  onScroll();
  $(window).resize(setSize);
  $(window).scroll(onScroll);

});



