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
// Build our data into HTML
// =====

var buildHTML = function(data, slug, templateId) {
  // If we've got some data
  if (data.length > 0) {
    // Build the template
    var template = _.template(
      $(templateId).html(),
      { variable: slug }
    );
    // Return the compiled html
    return template(data);
  } 
  else {
    console.log('No data. :(');
    return null;
  }
}

var formatData = function(categories,stories,intros) {
  var data = _.map(categories, function(category){
    var theStories = _.where(stories, { 'category' : category['category'] });
    var response = 
    { 
      'metadata' : category,
      'stories' : theStories
    };

    return response;
  }, { story: stories });

  return data;
}

// =====
// Get the data
// =====

var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1UTmofeY8rPZvXdN_CNJXfFgPlexiMmlSs5W8oPhqFko/pubhtml';

function init() {
  console.log('Ring, ring. Calling Google Sheets...')
  Tabletop.init( { key: public_spreadsheet_url,
                   callback: handleData,
                   simpleSheet: true } );
}

function handleData(data,tabletop) {
  console.log("They picked up! Handling the data...");

  var stories;
  var intros;
  var categories;

  // Pull out the stories and section intros
  stories = tabletop.sheets('story-cards').elements;
  intros = tabletop.sheets('intros').elements;

  // For each object, encode characters in the identified 'key' (replace spaces with dashes, encode html characters, return a new key/value)
  stories = encodeValue(stories,'category','categoryId');
  categories = encodeValue(intros,'category','categoryId');

  // Get our fully-formatted object with all our categories split out nicely
  var formattedData = formatData(categories,stories);

  // Turn nav into HTML that's ready to insert into the dom
  // var compiledNav = buildHTML(categories,'categories','#js-nav-template');

  // Turn body content into HTML that's ready to insert into the dom
  var compiledBody = buildHTML(formattedData,'sections','#js-story-template');

  // Write the totally packaged html to the DOM
  // $('#js-header').html(compiledNav);
  $('#js-main').html(compiledBody);

  // Hide the loading screen
  $('#js-loading').css('opacity','0');

  setTimeout(function() { 
    $('#js-loading').css('display','none')
  }, 2000);

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




