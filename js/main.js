var cityLocations = {"philadelphia11":{coords:[39.947, -75.162], year:"2011"},
                     "philadelphia12":{coords:[39.947, -75.162], year:"2012"}, 
                     "boston":{coords:[42.352, -71.053], year:"2011"},
                     "seattle":{coords:[47.604, -122.326], year:"2011"},
                     "macon":{coords:[32.8398, -83.6365], year:"2012"},
                     "santacruz":{coords:[36.9724, -122.0306],year:"2012"},
                     "chicago":{coords:[41.886, -87.655],year:"2012"},
                     "honolulu":{coords:[21.305, -157.859],year:"2012"},
                     "neworleans":{coords:[29.986, -90.093],year:"2012"},
                     "austin":{coords:[30.276, -97.756],year:"2012"},
                     "detroit":{coords:[42.360, -83.059], year:"2012"}};

$(function(){
  var usTopology;
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
    

    d3.select("#fellowshipMap svg")
      .attr("width", width-500)
      .attr("height", 0.5*(width-500));

    projection = d3.geo.albersUsa().scale(width-500).translate([((width-500)/2), (((width-500)*0.5)/2)]);
    path = d3.geo.path().projection(projection);;



    svg.selectAll("path").remove();
    svg.selectAll("path")
      .data(topojson.object(usTopology, usTopology.objects.states).geometries)
      .enter().append("path")
      .attr("d", path);

    svg.selectAll("circle").remove();
    for(c in cityLocations){
      var coordinates = projection(cityLocations[c].coords.reverse());
      svg.append('svg:circle')
        .attr('cx', coordinates[0])
        .attr('cy', coordinates[1])
        .attr('r', 5)
        .attr('class', "city "+c+" y"+cityLocations[c].year);
      $("circle").hover(function(e){
        $(".citycard[data-city='"+$(e.currentTarget).attr("class").split(" ")[1]+"']").fadeIn(300);
      }, function(e){
        $(".citycard[data-city='"+$(e.currentTarget).attr("class").split(" ")[1]+"']").fadeOut(500);
      });
    }


    
  }

  var scrollEvent = {
    handlers: {top:[], middle:[]},
    currentElements: {top:[], middle:[]},
    on:function(pos, el, addCb, removeCb){
      var elements = el.toArray();
      var i = 0;
      for(e in elements){
        scrollEvent.handlers[pos].push({el:elements[e], addCb:addCb, removeCb:removeCb, count:i});
        i++;
      }
    },
    onScroll:function(){
      var pos = $(window).scrollTop();
      var height = $(window).height();

      if(pos < 0)
        return;

      for(e in scrollEvent.handlers.middle){
        var el = scrollEvent.handlers.middle[e].el;

        //middle
        if(($(el).offset().top <= (pos + height/2)) && 
           ($(el).offset().top + $(el).outerHeight()  >= (pos + height/2))){          
          scrollEvent.setCurrentElement("middle", scrollEvent.handlers.middle[e]);
        }else{
          scrollEvent.removeCurrentElement("middle", scrollEvent.handlers.middle[e]);
        }
      }

      for(e in scrollEvent.handlers.top){
        var el = scrollEvent.handlers.top[e].el;

        //if the element is at the top of the page
        if(($(el).offset().top <= pos) && 
           ($(el).offset().top + $(el).outerHeight()  >= pos)){
          scrollEvent.setCurrentElement("top", scrollEvent.handlers.top[e]);

        }else{
          scrollEvent.removeCurrentElement("top", scrollEvent.handlers.top[e]);
        }
      }
    },
    setCurrentElement:function(pos, handler){

      if(scrollEvent.currentElements[pos].indexOf(handler) === -1){
        scrollEvent.currentElements[pos].push(handler);
        handler.addCb(handler.el,handler.count);
      }
    },
    removeCurrentElement:function(pos, handler){

      if(scrollEvent.currentElements[pos].indexOf(handler) >=0 ){
        delete scrollEvent.currentElements[pos][scrollEvent.currentElements[pos].indexOf(handler)];
        handler.removeCb(handler.el,handler.count);
      }
    }
  };

  scrollEvent.on("top", $(".fixed-top").parent(), function(el,i){
    $(el).children().addClass("apply");
  },function(el,i){
    $(el).children().removeClass("apply");
  });

  scrollEvent.on("top", $(".page"), function(el,i){
    $($("div.pagebg")[i]).fadeIn({duration:500});

    if($(el).attr("class").indexOf("quote") >= 0)
      $("div.sidebartitle").hide();
    else{
      $($("div.sidebartitle")[i]).show();
      $($("div.sidebartitle")[i]).addClass("appear");
    }
  }, function(el, i){
    $($("div.pagebg")[i]).fadeOut({duration:700});
    $($("div.sidebartitle")[i]).removeClass("appear");

  });

  scrollEvent.on("top", $("[data-trigger]"), function(el, i){
    var t = $(el).attr("data-trigger").split(",");


    if(t.indexOf("yeartitle")>=0)
      $(".yeartitle").addClass("fellowshipyearfixed");


    if(t.indexOf("title2012") >= 0)
      $(".yeartitle h1").text("2012");
    

    
    if(t.indexOf("2012") >= 0){
      $(".fellow.y2012").addClass("appear");
      $(".city.y2012").fadeIn();
    }


    

    if(t.indexOf("title2011") >= 0)
      $(".yeartitle h1").text("2011");
    

    if(t.indexOf("2011") >= 0){
      $(".fellow.y2011").addClass("appear");
      $(".city.y2011").fadeIn();
    }
    

  }, function(el, i){
    var t = $(el).attr("data-trigger").split(",");

    if(t.indexOf("yeartitle") >=0)
      $(".yeartitle").removeClass("fellowshipyearfixed");

    if(t.indexOf("2012") >= 0){
      $(".fellow.y2012").removeClass("appear");
      $(".city.y2012").hide();
    }
    

    if(t.indexOf("2011") >= 0){
      $(".fellow.y2011").removeClass("appear");
      $(".city.y2011").hide();
    }

  });

  $(window).scroll(function(){
    if($(window).scrollTop() > 0) {
  	  $("nav").fadeOut();
    } else {
  	  $("nav").fadeIn();
    }
  });














  scrollEvent.onScroll();
  $(window).scroll(scrollEvent.onScroll);
  

  var mapw = width-500;
  var maph = (0.5*mapw);

  var projection = d3.geo.albersUsa().scale(mapw).translate([(mapw/2), (maph/2)]);
  var path = d3.geo.path().projection(projection);;

//  var path = d3.geo.path();

  var svg = d3.select("#fellowshipMap").append("svg")
    .attr("width", mapw)
    .attr("height", maph);

  d3.json("js/us.json", function(error, topology) {
    usTopology = topology; 
    svg.selectAll("path")
      .data(topojson.object(topology, topology.objects.states).geometries)
      .enter().append("path")
      .attr("d", path);

    
    
    setSize();
    $(window).resize(setSize);

  });

});


// $('.carousel').carousel()

$('[id^="myCarousel"]').carousel();
