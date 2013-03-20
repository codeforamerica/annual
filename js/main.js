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

  var fixedInlineElements = function(pos){
    $(".fixed-top").each(function(i, el){

      //console.log(pos, $(el).offset().top, $(el).parent().outerHeight(), ($(el).parent().outerHeight()+$(el).parent().offset().top));

      if(($(el).parent().offset().top < pos) && 
         ($(el).parent().offset().top + $(el).parent().outerHeight()  > pos)){

        $(el).addClass("apply")

      }else{
        $(el).removeClass("apply")
        
      }
    });
    
  };
  var scrollTriggers = function(pos){
    $("[data-trigger]").each(function(i, el){
      if(($(el).offset().top < pos) && 
         ($(el).offset().top + $(el).outerHeight()  > pos)){

        var t = $(el).attr("data-trigger");

        if(t === "fellowshipmap"){
          var a = $(el).attr("data-action");
          var cities = $(el).attr("data-city").split(",");
          for(c in cities){
            console.log(cities[c]);
          
            if(a == "add"){
              //add to map.
              
              var coordinates = projection(cityLocations[cities[c]].reverse());
              svg.append('svg:circle')
                .attr('cx', coordinates[0])
                .attr('cy', coordinates[1])
                .attr('r', 5)
                .attr('class', "city");

            }else if(a == "hightlight"){
              //tranform is someway
            }
          }
        }

      }

    });

  };

  
  var onScroll = function(){
  	var pos = $(window).scrollTop();
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

          $($("div.pagebg")[i]).fadeIn({duration:700});
          $($("div.pagebg")[i+1]).fadeOut({duration:700});
          $($("div.pagebg")[i-1]).fadeOut({duration:700});
      
      }
    });
    
    fixedInlineElements(pos);
    scrollTriggers(pos)

  }

  setSize();
  onScroll();
  $(window).resize(setSize);
  $(window).scroll(onScroll);

  var mapw = 700,
  maph = 600;

  var projection = d3.geo.albersUsa().scale(700).translate([(maph/2), (mapw/2)]);
  var path = d3.geo.path().projection(projection);;

//  var path = d3.geo.path();

  var svg = d3.select("#fellowshipMap").append("svg")
    .attr("width", mapw)
    .attr("height", maph);

  d3.json("js/us.json", function(error, topology) {
    svg.selectAll("path")
      .data(topojson.object(topology, topology.objects.states).geometries)
      .enter().append("path")
      .attr("d", path);



  });

});



