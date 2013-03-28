var cityLocations = [{
    "geometry": { "type": "Point", "coordinates": [-75.162, 39.947]},
    "properties": { "city": "philadelphia", "year": "2011" }
},  {
    "geometry": { "type": "Point", "coordinates": [-71.053, 42.352]},
    "properties": { "city": "boston", "year": "2011" }
}, {
    "geometry": { "type": "Point", "coordinates": [-122.326, 47.604]},
    "properties": { "city": "seattle", "year": "2011" }
},{
    "geometry": { "type": "Point", "coordinates": [-75.162, 39.947]},
    "properties": { "city": "philadelphia", "year": "2012" }
},{
    "geometry": { "type": "Point", "coordinates": [-83.6365, 32.8398]},
    "properties": { "city": "macon", "year":"2012" }
}, {
    "geometry": { "type": "Point", "coordinates": [-122.0306, 36.9724]},
    "properties": { "city": "santacruz", "year":"2012" }
}, {
    "geometry": { "type": "Point", "coordinates": [-87.655, 41.886]},
    "properties": { "city": "chicago", "year":"2012" }
}, {
    "geometry": { "type": "Point", "coordinates": [-157.859, 21.305]},
    "properties": { "city": "honolulu", "year":"2012" }
}, {
    "geometry": { "type": "Point", "coordinates": [-97.756, 30.276]},
    "properties": { "city": "austin", "year":"2012" }
}, {
    "geometry": { "type": "Point", "coordinates": [-83.059, 42.360]},
    "properties": { "city": "detroit", "year":"2012" }
}];

var color2011 = "ff3658",
    color2012 = "C82A45";


$(function(){
  var usTopology;
  //shows nav when user hovers over the logo
  var height = $(window).height(),
  width = $(window).width();

  var setSize = function(){
    height = $(window).height();
    width = $(window).width();
    
    $(".quote").css({width:width, height:height});
    $(".story").css({width:width, "min-height":height});
    $(".pagebg").css({width:width, height:height});
    $(".scrollout").css({height:height});
    $(".fellowship").css({height:height});
    
    scrollEvent.onScroll();
    
  }

  var scrollEvent = {
    handlers: {top:[], middle:[], bottom:[]},
    currentElements: {top:[], middle:[], bottom:[]},
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
      for(e in scrollEvent.handlers.bottom){
        var el = scrollEvent.handlers.bottom[e].el;

        //if the element is at the top of the page
        if(($(el).offset().top <= (pos+ height)) && 
           ($(el).offset().top + $(el).outerHeight()  >= (pos +height))){
          scrollEvent.setCurrentElement("bottom", scrollEvent.handlers.bottom[e]);

        }else{
          scrollEvent.removeCurrentElement("bottom", scrollEvent.handlers.bottom[e]);
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


  scrollEvent.on("middle", $(".page"), function(el,i){
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
  scrollEvent.on("top", $("iframe[data-src]"), function(el,i){
    if($(el).attr("src") === undefined)
      $(el).attr("src", $(el).attr("data-src"))
  }, function(el, i, pos){
  });
  scrollEvent.on("bottom", $("iframe[data-src]"), function(el,i){
    if($(el).attr("src") === undefined)
      $(el).attr("src", $(el).attr("data-src"))
  }, function(el, i, pos){
  });
  scrollEvent.on("middle", $("iframe[data-src]"), function(el,i){
    if($(el).attr("src") === undefined)
      $(el).attr("src", $(el).attr("data-src"))
  }, function(el, i, pos){
  });



  scrollEvent.on("top", $(".fellowship"), function(el,i){
    $("#mapcontainer").css({"position":"fixed", "top":"0", "bottom": "0"});


  }, function(el, i, pos){

    if($(".fellowship").offset().top <= $(window).scrollTop())
      $("#mapcontainer").css({"position":"absolute", "top":$(".fellowship").height(), "bottom":"auto", "height":$(window).height()});
    else
      $("#mapcontainer").css({"position":"absolute", "top":0});
    
  });
  scrollEvent.on("top", $(".scrollout"), function(el, i){
      $("#mapcontainer").css({"position":"absolute", "top":$(".fellowship").height(), "bottom":"auto", "height":$(window).height()});
  }, function(){});

  scrollEvent.on("middle", $(".mapscroll"), function(el,i){

    if($(el).attr("class").indexOf("fellowship2011") >= 0){
      $(".yeartitle h1").css("color","#"+color2011).text("2011");

      markerLayer.filter(function(f) {
        return f.properties['year'] === '2011';
      });

      map.ease.to(map.extentCoordinate(markerLayer.extent())).optimal();


    }
    
    if($(el).attr("class").indexOf("fellowship2012") >= 0){
      $(".yeartitle h1").css("color","#"+color2012).text("2012");

      markerLayer.filter(function(f) {
        return f.properties['year'] === '2012';
      });
      
      map.ease.to(map.extentCoordinate(markerLayer.extent())).optimal();


    }
    


  }, function(el, i){

  });





  scrollEvent.onScroll();
  $(window).scroll(scrollEvent.onScroll);
  
    
  setSize();
  $(window).resize(setSize);

  $('[id^="myCarousel"]').carousel({
    interval: 5000,
    cycle: true
  });


  // Create map
  var layer = mapbox.layer().id('tmcw.map-2f4ad161');


  var map = mapbox.map('map', layer, null, [easey_handlers.DragHandler(), easey_handlers.DoubleClickHandler()]);

  map.centerzoom({lat: 43.6, lon: -79.4 }, 4)

  var markerLayer = mapbox.markers.layer().features(cityLocations);
  var interaction = mapbox.markers.interaction(markerLayer);

  var markerFactory = function(m) {

    // Create a marker using the simplestyle factory
    var elem = $(mapbox.markers.simplestyle_factory(m));

    // Add function that centers marker on click
    MM.addEvent(elem[0], 'click', function(e) {
      map.ease.location({
        lat: m.geometry.coordinates[1],
        lon: m.geometry.coordinates[0]
      }).zoom(map.zoom()).optimal();
    });



    if(m.properties.year == "2011")
      elem.attr("src", "http://a.tiles.mapbox.com/v3/marker/pin-m+"+color2011+"@2x.png");
    else
      elem.attr("src", "http://a.tiles.mapbox.com/v3/marker/pin-m+"+color2012+"@2x.png");
      
    return elem[0]; 
  }


  markerLayer.factory(markerFactory);


  interaction.formatter(function(feature) {
    var html = $(".citycard[data-city='"+feature.properties.city+"'][data-year='"+feature.properties.year+"']").html()

    return html;
  });


  map.addLayer(markerLayer).setExtent(markerLayer.extent());

  // Attribute map
  map.ui.attribution.add()
    .content('<a href="http://mapbox.com/about/maps">Map by Mapbox</a>');



});


