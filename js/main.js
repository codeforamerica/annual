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
    //$("div.pagebg").css({opacity:1});  
    $(".page").each(function(i, el){
      //if(i ==0)
      //  console.log(el, $(el).offset().top, $(el).offset().top, $(el).outerHeight(), $(window).scrollTop());

      if(($(el).offset().top <= $(window).scrollTop()) &&
         ($(el).offset().top+$(el).outerHeight() >= $(window).scrollTop())){
        //in transition 
      
        var percPage = ($(window).scrollTop() - $(el).offset().top) / ($(el).outerHeight());

        console.log(percPage);



        $($("div.pagebg")[i]).fadeIn({duration:1000});
        $($("div.pagebg")[i+1]).fadeOut({duration:1000});
        $($("div.pagebg")[i-1]).fadeOut({duration:1000});

      
      }
    });
  }

  setSize();
  onScroll();
  $(window).resize(setSize);
  $(window).scroll(onScroll);

});



