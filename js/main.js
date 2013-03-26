var cityLocations = {"philadelphia":[39.947, -75.162], 
                     "boston":[42.352, -71.053],
                     "seattle":[47.604, -122.326],
                     "macon":[32.8398, -83.6365],
                     "santacruz":[36.9724, -122.0306],
                     "chicago":[41.886, -87.655],
                     "honolulu":[21.305, -157.859],
                     "neworleans":[29.986, -90.093],
                     "austin":[30.276, -97.756],
                     "detroit":[42.360, -83.059]};

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


    if(svg !== undefined){
      svg.selectAll("path").remove();
      svg.selectAll("path")
        .data(topojson.object(usTopology, usTopology.objects.states).geometries)
        .enter().append("path")
        .attr("d", path);
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
      console.log(pos, height);
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

      if(scrollEvent.currentElements[pos].indexOf(handler.el) === -1){
        scrollEvent.currentElements[pos].push(handler.el);
        handler.addCb(handler.el,handler.count);
      }
    },
    removeCurrentElement:function(pos, handler){

      if(scrollEvent.currentElements[pos].indexOf(handler.el) >=0 ){
        delete scrollEvent.currentElements[pos][scrollEvent.currentElements[pos].indexOf(handler.el)];
        handler.removeCb(handler.el,handler.count);
      }
    }
  };

  scrollEvent.on("top", $(".fixed-top").parent(), function(el,i){
    console.log("add fixed", el);
    $(el).children().addClass("apply");
  },function(el,i){
    console.log("remove fixed", el);
    $(el).children().removeClass("apply");
  });

  scrollEvent.on("top", $(".page"), function(el,i){
    console.log("add", el, i);
    $($("div.pagebg")[i]).fadeIn({duration:500});
    $($("div.sidebartitle")[i]).addClass("appear");
  }, function(el, i){
    console.log("remove", el, i)
    $($("div.pagebg")[i]).fadeOut({duration:700});
    $($("div.sidebartitle")[i]).removeClass("appear");
  });

  scrollEvent.on("top", $("[data-trigger]"), function(el, i){
    var t = $(el).attr("data-trigger").split(",");
    if(t.indexOf("addclass") >=0){
      $($(el).attr("data-class-target")).addClass($(el).attr("data-class"));
      if($(el).attr("data-class-target").indexOf(".year") !== -1)
        $($(el).attr("data-class-target")).parent().css("padding-top", $($(el).attr("data-class-target")).height());
    }

    if(t.indexOf("2012") >= 0){
      $(".yeartitle h1").text("2012");
      $(".fellow.2012").addClass("appear");
    }

    if(t.indexOf("2011") >= 0){
      $(".yeartitle h1").text("2011");
      $(".fellow.2011").addClass("appear");
    }

  }, function(el, i){
    var t = $(el).attr("data-trigger").split(",");
    if(t.indexOf("addclass") >= 0){
      if($(el).attr("data-class-target").indexOf(".year") !== -1)
        $($(el).attr("data-class-target")).parent().css("padding-top", "inherit");
      $($(el).attr("data-class-target")).removeClass($(el).attr("data-class"));
    }

    if(t.indexOf("2012") >= 0)
      $(".fellow.2012").removeClass("appear");
    

    if(t.indexOf("2011") >= 0)
      $(".fellow.2011").removeClass("appear");

  });

  scrollEvent.on("middle", $("[data-trigger]"), function(el, i){
    var t = $(el).attr("data-trigger").split(",");
    if(t.indexOf("fellowshipmap") >= 0){
      var a = $(el).attr("data-action");
      var cities = $(el).attr("data-city").split(",");
      for(c in cities){
        if(svg !== undefined){
          
          if(a == "add"){
            //add to map.
            
            if(svg.select("circle.city."+cities[c])[0][0] === null){
              
              var coordinates = projection(cityLocations[cities[c]].reverse());
              svg.append('svg:circle')
                .attr('cx', coordinates[0])
                .attr('cy', coordinates[1])
                .attr('r', 5)
                .attr('class', "city "+cities[c]);
              $("circle").hover(function(e){
                console.log($(e.currentTarget).attr("class").split(" ")[1])
                $(".citycard[data-city='"+$(e.currentTarget).attr("class").split(" ")[1]+"']").fadeIn(300);
              }, function(e){
                $(".citycard[data-city='"+$(e.currentTarget).attr("class").split(" ")[1]+"']").fadeOut(500);
              });


            }

          }
        }
      }
    }
  },function(el, i){});



  $(window).scroll(function(){
    if($(window).scrollTop() > 0) {
  	  $("nav").fadeOut();
    } else {
  	  $("nav").fadeIn();
    }
  });













  setSize();
  scrollEvent.onScroll();
  $(window).resize(setSize);
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



  });

});


$('.carousel').carousel()
