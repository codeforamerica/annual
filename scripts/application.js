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

// Create a new unique key-value pair out of an old key-value pair
// # somedata = { foo: 'This Is Cool' }
// encodeValue(somedata,foo,new_foo)
// => { foo: 'It's So Cool', new_foo: 'it&#x27;s-so-cool' }

function encodeValue(data,baseKey,newKey) {
  var newObject = _.map(data, function(item){
    var response;
    var response = _.pick(item, baseKey);
    var response = response[baseKey];
    var response = _.escape(response);
    var response = response.split(' ').join('-').toLowerCase();
    var response = _.object([newKey],[response])
    var response = _.extend(item, response);
    return response;
  });
  return newObject;
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

  // Pull out the stories and section intros
  stories = tabletop.sheets('story-cards').elements;
  intros = tabletop.sheets('intros').elements;

  // For each object, encode characters in the identified 'key' (replace spaces with dashes, encode html characters, return a new key/value)
  stories = encodeValue(stories,'category','categoryId');
  intros = encodeValue(intros,'category','categoryId');

  // Make a list of unique categories
  categories =  _.chain(stories)
                    .pluck('category')
                    .uniq()
                    .value();

  console.log(stories);

  // For each category, ready our html
  // ...
  var html = [];

  writeHTML(stories,'#js-story-template','stories','#js-main');

  // Write the totally packaged html to the DOM

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




