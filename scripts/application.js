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
// Transform our data
// =====

// Encode the category names
// # 'This Is Cool' 
// => 'this-is-cool'

function encodeValue(data,category,newCategory) {
  var newStory = _.map(data, function(item){
   var newEntry = _.mapObject(item, function(val,key) {
      if (key == category) {
        var response = _.escape(val);
        response = response.split(' ').join('-').toLowerCase();
        return response;
      } 
      else {
        return val;
      }
    });
    return newEntry;
  });
  return newStory;
}

// =====
// Get the data
// =====

var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1UTmofeY8rPZvXdN_CNJXfFgPlexiMmlSs5W8oPhqFko/pubhtml';
var data;

function init() {
  Tabletop.init( { key: public_spreadsheet_url,
                   callback: handleData,
                   simpleSheet: true } );
}

function handleData(data,tabletop) {
  console.log("Success!");

  var stories;
  var intros;
  var categories;

  // Put the data into a global variable
  data = tabletop.sheets;

  // Pull out the stories and section intros
  stories = tabletop.sheets('story-cards').elements;
  intros = tabletop.sheets('intros').elements;

  // For each object, encode characters in the identified 'key' (replace spaces with dashes, encode html characters, return a new key/value)
  stories = encodeValue(stories,'category','category-id');
  intros = encodeValue(stories,'category','category-id');

  // Make a list of unique categories
  categories =  _.chain(stories)
                    .pluck('category')
                    .uniq()
                    .value();

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




