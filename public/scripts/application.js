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
  $('#js-nav-open').click(function(e){
    e.preventDefault();
    $('#js-page').toggle();
    $('#js-offpage').toggle();
  });
  $('#js-nav-close').click(function(e){
    e.preventDefault();
    $('#js-page').toggle();
    $('#js-offpage').toggle();
  });
})