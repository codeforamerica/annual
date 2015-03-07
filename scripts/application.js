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

var resize = function() {
  // Get the height of the header, make it an integer
  var offset = parseInt($('#js-header').height());
  // Give it a unit
  offset = offset + "px";
  // Apply it to the content
  $('#js-main').css('margin-top',offset);
}

// =====
// Get the data
// =====

var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1UTmofeY8rPZvXdN_CNJXfFgPlexiMmlSs5W8oPhqFko/pubhtml';

function init() {
  Tabletop.init( { key: public_spreadsheet_url,
                   callback: showInfo,
                   simpleSheet: true } );
}

function showInfo(data,tabletop) {
  console.log("Success!");
  var stories = tabletop.sheets('story-cards').elements;
  console.log(stories);
  writeHTML(stories,'#js-story-template','stories','#js-main');
}

// =====
// Publish it to the DOM
// =====

var writeHTML = function(data, template, slug, target) {
  // If the endpoint gave us any data
  if (data.length > 0) {
    // Build the template
    var template = _.template(
      $(template).html(),
      { variable: slug }
    );
    // Write the template to DOM
    $(target).html(
      template(data)
    );
    return true;
  } else {
    console.log('No data. :(');
    return false;
  }
}

$(window).resize(function(){
  resize();
});

$(document).ready(function(){
  // Resize the window on ready
  resize();
  // Run tabletop
  init();
});




