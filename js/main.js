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
    
    //projection = d3.geo.albersUsa().scale(mapw).translate([(mapw/2), (maph/2)]);
    //path = d3.geo.path().projection(projection);;

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

    pos += $(window).height()/2;

    $("[data-trigger]").each(function(i, el){
      if(($(el).offset().top < pos) && 
         ($(el).offset().top + $(el).outerHeight()  > pos)){

        var t = $(el).attr("data-trigger");

        if(t === "fellowshipmap"){
          var a = $(el).attr("data-action");
          var cities = $(el).attr("data-city").split(",");
          for(c in cities){

          
            if(a == "add"){
              //add to map.
              
              if(svg.select("circle.city."+cities[c])[0][0] === null){

                var coordinates = projection(cityLocations[cities[c]].reverse());
                svg.append('svg:circle')
                  .attr('cx', coordinates[0])
                  .attr('cy', coordinates[1])
                  .attr('r', 5)
                  .attr('class', "city "+cities[c]);
              }

            }else if(a == "highlight"){
              console.log("highlight", cities[c]);
              svg.selectAll("circle.city").transition().duration(1000).style("fill", "333").attr("r", 5);
              svg.select("circle.city."+cities[c]).transition().duration(1000).style("fill", "red").attr("r", 15);
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



