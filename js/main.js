var cityLocations = [{
    "geometry": { "type": "Point", "coordinates": [-75.162, 39.947]},
    "properties": { "city": "philadelphia", "year": "2011" }
},  {
    "geometry": { "type": "Point", "coordinates": [-71.053, 42.352]},
    "properties": { "city": "boston", "year": "2011" }
}, {
    "geometry": { "type": "Point", "coordinates": [-122.326, 47.604]},
    "properties": { "city": "seattle", "year": "2011" }
}, {
    "geometry": { "type": "Point", "coordinates": [-122.4183, 37.7750]},
    "properties": { "city": "sanfrancisco", "year":"2011" }
}, {
    "geometry": { "type": "Point", "coordinates": [-75.162, 39.947]},
    "properties": { "city": "philadelphia", "year": "2012" }
}, {
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
},{
    "geometry": { "type": "Point", "coordinates": [-90.087, 29.968]},
    "properties": { "city": "neworleans", "year":"2012" }
}, {
    "geometry": { "type": "Point", "coordinates": [-97.756, 30.276]},
    "properties": { "city": "austin", "year":"2012" }
}, {
    "geometry": { "type": "Point", "coordinates": [-83.059, 42.360]},
    "properties": { "city": "detroit", "year":"2012" }
}];

var color2011 = "fedd44",
    color2012 = "C82A45";

if (typeof console === "undefined" || typeof console.log === "undefined") {
  console = {log:function(){}};
}

$(function(){
  var readytoshow = false;
  $('<img/>').attr('src', 'img/iphone.jpg').load(function() {
    if(readytoshow)
      $("#loading").fadeOut({duration:1000});
    readytoshow = true;
  });
  setTimeout(function(){
    if(readytoshow)
      $("#loading").fadeOut({duration:1000});
    readytoshow = true;
  }, 1500);
  var usTopology;
  //shows nav when user hovers over the logo
  var height = $(window).height(),
  width = $(window).width();

  var setSize = function(){
    height = $(window).height();
    width = $(window).width();
    
    $(".quote").css({width:width, "min-height":height});
    $(".story").css({width:width, "min-height":height});
    $(".pagebg").css({width:width, "min-height":height});
    $(".scrollout").css({height:height});
    $(".fellowship").css({height:height});
    $(".mapscroll").css({height:height});
    scrollEvent.onScroll();
    
  }

  var scrollEvent = {
    handlers: {top:[], middle:[], bottom:[], inview:[]},
    currentElements: {top:[], middle:[], bottom:[], inview:[]},
    on:function(pos, el, addCb, removeCb){
      var elements = el.toArray();
      var i = 0;
      for(e in elements){
        if(typeof elements[e] !== "object")
          continue;
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
        if(typeof el !== "object")
          continue;

        console.log(el);
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
        if(typeof el !== "object")
          continue;

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
        if(typeof el !== "object")
          continue;

        //if the element is at the top of the page
        if(($(el).offset().top <= (pos+ height)) && 
           ($(el).offset().top + $(el).outerHeight()  >= (pos +height))){
          scrollEvent.setCurrentElement("bottom", scrollEvent.handlers.bottom[e]);

        }else{
          scrollEvent.removeCurrentElement("bottom", scrollEvent.handlers.bottom[e]);
        }
      }
      for(e in scrollEvent.handlers.inview){
        var el = scrollEvent.handlers.inview[e].el;
        if(typeof el !== "object")
          continue;

        //if the element is at the top of the page
        if(($(el).offset().top + $(el).outerHeight() >= pos) && 
           ($(el).offset().top   <= (pos +height))){
          scrollEvent.setCurrentElement("inview", scrollEvent.handlers.inview[e]);

        }else{
          scrollEvent.removeCurrentElement("inview", scrollEvent.handlers.inview[e]);
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
    if(($(el).attr("class").indexOf("quote") >= 0) || ($(el).attr("class").indexOf("nosidebar") >= 0))
      $("div.sidebartitle").hide();
    else{
      $($("div.sidebartitle")[i]).show();
      $($("div.sidebartitle")[i]).addClass("appear");
    }
  }, function(el, i){
    $($("div.pagebg")[i]).fadeOut({duration:700});
    $($("div.sidebartitle")[i]).removeClass("appear");

  });
  scrollEvent.on("inview", $("iframe[data-src]"), function(el,i){
    if($(el).attr("src") === undefined)
      $(el).attr("src", $(el).attr("data-src"))
  }, function(el, i, pos){
  });

  scrollEvent.on("bottom", $(".fellowship"), function(el,i){

    $("#mapcontainer").css({"position":"absolute", "top":0});
    $(".yeartitle h1").css("color","#"+color2011).text("2011");
    $(".yeartitle h2").css("color","#"+color2011).text("The Fellowship");

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
  var arrowInterval =0;
  var mapcurrentyear = "2011";
  scrollEvent.on("middle", $(".mapscroll"), function(el,i){

    if($(el).attr("class").indexOf("fellowship2011") >= 0){
      $(".yeartitle h1").css("color","#"+color2011).text("2011");
      $(".yeartitle h2").css("color","#"+color2011).text("The Fellowship");
      mapcurrentyear = "2011";
      interaction.hideTooltips();
      displayedMarkers = [];
      markerLayer.filter(function(f) {
        return f.properties['year'] === '2011';
      });

      map.ease.to(map.extentCoordinate(markerLayer.extent())).optimal();

      //setTimeout(showRandomTooltip, 1200);

    }
    
    if($(el).attr("class").indexOf("fellowship2012") >= 0){
      $(".yeartitle h1").css("color","#"+color2012).text("2012");
      $(".yeartitle h2").css("color","#"+color2012).text("The Fellowship");
      mapcurrentyear = "2012";
      interaction.hideTooltips();
      displayedMarkers = [];
      markerLayer.filter(function(f) {
        return f.properties['year'] === '2012';
      });
      
      map.ease.to(map.extentCoordinate(markerLayer.extent())).optimal();

      //setTimeout(showRandomTooltip, 1200);
    }

    arrowInterval = setInterval(function(){
      $(".downarrow").animate({opacity:1}, 800, "swing", function(){
        $(".downarrow").animate({opacity:0}, 800, "swing");
      })}, 2000);

  }, function(el, i){
    clearInterval(arrowInterval);
    $(".downarrow").animate({opacity:1}, 800, "swing");
  });

  $(".downarrow").on("click touchend", function(){

    if(mapcurrentyear === "2011"){
     $("html body").animate({
        scrollTop: $("div.fellowship2012.mapscroll").offset().top
      }, 1500);
    }else if(mapcurrentyear === "2012"){
      $("html body").animate({
        scrollTop: $("div.story div.cityLeaders").offset().top - 20
      }, 1500);
    }
  })
 scrollEvent.on("top", $(".page"), function(el,i){

   $(".navbar li").removeClass("active");;
   if($(el).attr("data-section") !== "")
     $(".navbar li."+$(el).attr("data-section")).addClass("active");
   
 },function(){

 });
 scrollEvent.on("bottom", $(".page"), function(el,i){

   $(".navbar li").removeClass("active");;
   if($(el).attr("data-section") !== "")
     $(".navbar li."+$(el).attr("data-section")).addClass("active");
   
 },function(){

 });

  $(".navbar .nav li a").on("click touchend", function(e){
    e.preventDefault();
    var section = $(e.currentTarget).parent().attr("class").split(" ")[0];
    $("body,html").animate({scrollTop: $($("div.page[data-section='"+section+"']")[0]).offset().top}, 1000);
  });



  var showRandomTooltip = function(){

    currentMarker = displayedMarkers[Math.floor(Math.random()*displayedMarkers.length)]

    currentMarker.showTooltip();

    point = map.locationPoint({
      lat: currentMarker.data.geometry.coordinates[1],
      lon: currentMarker.data.geometry.coordinates[0]
    })

    var quarter = map.dimensions.y * (1/ 4);
    point.y -= quarter;
    map.ease.location(map.pointLocation(point)).zoom(map.zoom()).optimal();

  }

  scrollEvent.onScroll();
  $(window).scroll(scrollEvent.onScroll);
  
    
  setSize();
  $(window).resize(setSize);

  $('[id^="myCarousel"]').carousel({
    interval: false,
    cycle: true
  });

  $('.captpop').popover({
    placement: 'top',
    trigger: 'hover'
  });

  $('.morefellowspop').popover({
    placement: 'top',
    trigger: 'hover'
  });

  $('#map').delegate(".fellowpop", "mouseenter", function(e){
    var name = $(e.currentTarget).attr('data-original-title');
    $(e.currentTarget).parents('.innercard').find('.name').text(name);
  });
  $("#map").delegate(".fellowpop", "mouseleave", function(e){
    $(e.currentTarget).parents('.innercard').find('.name').html('&nbsp;');
  });

  $('.appspop').popover({
    placement: 'top',
    trigger: 'hover',
  });

  $('.footnote').popover({
    placement: 'top',
    trigger: 'hover'
  });


  // Create map
  var layer = mapbox.layer().id('dmt.map-cdkzgmkx');


  var map = mapbox.map('map', layer, null, [easey_handlers.DragHandler()]);

  map.centerzoom({lat: 43.6, lon: -79.4 }, 4)

  var markerLayer = mapbox.markers.layer().features(cityLocations);
  var interaction = mapbox.markers.interaction(markerLayer).exclusive(true).showOnHover(false);//.hideOnMove(false);

  var displayedMarkers = [];
  var currentMarker = null;

  markerLayer.sort(function(a, b) {
    return a.geometry.coordinates[0] -
      b.geometry.coordinates[0];
  });

  markerLayer.addCallback("markeradded", function(l, m){
    if($(m.element).attr("class").indexOf("simplestyle-marker") === -1)
      return;
    displayedMarkers.push(m);
    $(m.element).css("top", "-1000px");
    
    setTimeout(function(){
      $(m.element).animate({"top":"0px"}, 400);
    }, Math.random() * 300);


  });



  var markerFactory = function(m) {

    // Create a marker using the simplestyle factory
    var elem = $(mapbox.markers.simplestyle_factory(m));
    elem.attr("data-city", m.properties.city);
    elem.attr("data-year", m.properties.year);

    // Add function that centers marker on click
    MM.addEvent(elem[0], 'click', function(e) {
      markers  = markerLayer.markers();
      for(mark in markers){
        if((typeof markers[mark] !== "object") || ($(markers[mark].element).attr("class").indexOf("simplestyle-marker") === -1))
          continue;
        if(($(e.toElement).attr("data-city") === markers[mark].data.properties.city) &&
           ($(e.toElement).attr("data-year") === markers[mark].data.properties.year)){
          currentMarker = markers[mark];
        }        
      }

      point = map.locationPoint({
        lat: m.geometry.coordinates[1],
        lon: m.geometry.coordinates[0]
      })
      var quarter = map.dimensions.y * (3/ 8);
      point.y -= quarter;
      map.ease.location(map.pointLocation(point)).zoom(map.zoom()).optimal();
    });



    if(m.properties.year == "2011")
      elem.attr("src", "http://a.tiles.mapbox.com/v3/marker/pin-m+"+color2011+"@2x.png");
    else
      elem.attr("src", "http://a.tiles.mapbox.com/v3/marker/pin-m+"+color2012+"@2x.png");
      
    return elem[0]; 
  }

  
  var cycleMarker = function(direction){

    var position = displayedMarkers.indexOf(currentMarker);

    if(direction === "next"){

       if(position +1 >= displayedMarkers.length)
        position =0;
      else
        position++;

    }else{
      if(position -1 < 0)
        position =displayedMarkers.length-1;
      else
        position--;
    }
    currentMarker = displayedMarkers[position];
    displayedMarkers[position].showTooltip();

    point = map.locationPoint({
      lat: currentMarker.data.geometry.coordinates[1],
      lon: currentMarker.data.geometry.coordinates[0]
    })

    var quarter = map.dimensions.y * (1/ 8);
    point.y -= quarter;
    map.ease.location(map.pointLocation(point)).zoom(map.zoom()).optimal();
    
  }


  markerLayer.factory(markerFactory);


  interaction.formatter(function(feature) {
    var html = $("<div>").append($(".citycardscontainer .citycard[data-city='"+feature.properties.city+"'][data-year='"+feature.properties.year+"']").clone()).html();
    html = "<div class='close'>X</div>" +html;
    return html;
  });

  $("#map").delegate(".prev,.next", "click", function(e){
    cycleMarker($(e.currentTarget).attr("class"));
  });

  $("#map").delegate(".close", "touchend click", function(e){
    interaction.hideTooltips();
    map.ease.to(map.extentCoordinate(markerLayer.extent())).optimal();
  });

  map.addLayer(markerLayer).setExtent(markerLayer.extent());

  markerLayer.filter(function(f) {
    return f.properties['year'] === '';
  });


  $($("#map").children()[1]).css("z-index", "1");

  // Attribute map
  map.ui.attribution.add()
    .content('<a href="http://mapbox.com/about/maps">Map by Mapbox</a>');


  var colors = ["#5db7ad", "#88c5be", "#9ccdc8", "#aed5d1", "#c2dedb", "#d4e7e5", "#e8f2f1", "#FFFFFF"];

  $(".bargraph").each(function(i, el){

    var that = this;

    var total = 0; 
    // Count all the money for each data point in the source
    $("."+$(el).attr("data-source")).each(function(i, el){
      // remove commas and dollar signs
      total += parseInt($(el).text().replace(/,/g, "").replace("$", ""));
    });

    // for each group add the hover events
    $(".financialsgroup").each(function(i, el) {
      var group = $(el).attr("data-group");
      $(el).hover(function() {
        $(el).addClass("active");
        $('.group' + group).addClass('active');
      }, function(){
        $(el).removeClass("active");
        $('.group' + group).removeClass('active');
      });
    });

    // for each data point add a section to the graph and hover events
    $("."+$(el).attr("data-source")).each(function(i, el){
      var count = parseInt($(el).text().replace(/,/g, "").replace("$", ""));
      var perc = (count/total)*100;
      var group = $(el).attr("data-group");

      // create section
      var section = $("<div class='graphsection'></div>").css({
        width:perc + "%",
        background:colors[i]
      });

      // add classs for group
      if(group !== undefined) {
        $(el).addClass('group' + group);
        section.addClass('group' + group);
      }

      //hover over the numbers
      $(el).hover(highlight, unhighlight);
      $(section).hover(highlight, unhighlight);

      function  highlight() {
        $(el).addClass('active');
        $(section).addClass('active');
      }

      function unhighlight() {
        $(el).removeClass('active');
        $(section).removeClass('active');
      }


      $(that).append(section);
    });



  });




});


if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length >>> 0;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}
