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
  //LatLng()
  var map = L.map('map').setView([0.29114, 9.20654], 2);
  
    // replace "toner" here with "terrain" or "watercolor"
    var layer = new L.StamenTileLayer("toner-lite");

    map.addLayer(layer);
  
    map.on('click', function(e) {
        alert(e.latlng);
    });
  
}) 