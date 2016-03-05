/**
*
* application.js
*
* This stores our core JavaScript. 
*
**/


// =====
// Push the content down when the window changes sizes
// =====

// var resize = function() {
//   // Get the height of the header, make it an integer
//   var offset = parseInt($('#js-header').height());
//   // Give it a unit
//   offset = offset + "px";
//   // Apply it to the content
//   $('#js-main').css('margin-top',offset);
// }

// $(window).resize(function(){
//   resize();
// });

// $(document).ready(function(){
//   resize();
// })

// =====
// Show and hide the contents screen
// =====

$(document).ready(function(){
  
  $('#js-menu-toggle').click(function(e){
    e.preventDefault();
    $('body').toggleClass('js-menu-open');
  });
  
  // =====
  // LEAFLET
  // =====
  
  //console.log($('#map').length);
  
  //only run map code if the map container exists.
  if($('#map').length > 0) {
    
    var greenIcon = L.icon({
      iconUrl: 'assets/images/oac-pin.svg',
  
      iconSize:     [20, 24], // size of the icon
      iconAnchor:   [10, 12], // point of the icon which will correspond to marker's location
      popupAnchor:  [0,-12] // point from which the popup should open relative to the iconAnchor
    });
  
    var map = L.map('map').setView([0.29114, 9.20654], 2);
    var layer = new L.StamenTileLayer("toner-lite");
        
    map.addLayer(layer);
  
    /*map.on('click', function(e) {
        alert(e.latlng);
    });*/
  
    $('.map-data').each(function() {
    
      var url = $(this).find('a').attr('href');
      var chapter = '<a href="' + url + '">' + $(this).find('.chapter-name').text() + '</a>';
      var coords = $(this).find('.coordinates').text();
      
      if(coords != '') {
        
        var lat = parseFloat(coords.split(',')[0]);
        var lng = parseFloat(coords.split(',')[1]);
      
        L.marker([lat, lng], {icon: greenIcon}).addTo(map).bindPopup(chapter);
        
      }
    })
  } /* close map */
  
}) 