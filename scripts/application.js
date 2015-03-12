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

$(window).resize(function(){
  resize();
});

// =====
// Transform our data
// =====

// Create a new unique key-value pair out of an old key-value pair
// # somedata = { foo: 'This Is Cool' }
// encodeValue(somedata,foo,new_foo)
// => { foo: 'It's So Cool', new_foo: 'it&#x27;s-so-cool' }

function createId(data,baseKey,newKey) {
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
  // Build the template
  var template = _.template(
    $(templateId).html(),
    { variable: slug }
  );
  // Return the compiled html
  return template(data);
}

var combine = function(categories,stories,intros) {
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

  var opener,
      categories,
      stories;

  // Pull out the stories and section intros
  opener = tabletop.sheets('opener').elements;
  categories = tabletop.sheets('categories').elements;
  stories = tabletop.sheets('stories').elements;

  // For each object, encode characters in the identified 'key' (replace spaces with dashes, encode html characters, return a new key/value)
  opener = createId(opener,'category','categoryId');
  categories = createId(categories,'category','categoryId');
  stories = createId(stories,'category','categoryId');

  // Get our fully-formatted object with all our categories sorted nicely
  var sections = combine(categories,stories);

  saveData(opener,sections);
  makeReport(opener,sections);
}

// =====
// Save the data
// =====

function saveData(opener,sections) {
  console.log("Saving data...")
  
  var Report,
      cachedAt;

  cachedAt = new Date();

  Report = 
  {
    'cachedAt' : cachedAt,
    'opener' : opener,
    'sections' : sections
  }

  localStorage.setItem('Report',JSON.stringify(Report));
}

// =====
// Make the report
// =====

function makeReport(opener,sections) {
  console.log("Making the report...");

  // Build the HTML we'll put into the DOM
  var nav = buildHTML({ 
                        'opener' : opener[0],
                        'sections' : sections
                      },'data','#js-nav-template');

  var content = buildHTML({ 
                            'opener' : opener[0],
                            'sections' : sections
                          },'data','#js-story-template');

  // Write the totally packaged html to the DOM
  $('#js-header').html(nav);
  $('#js-main').html(content);

  // Resize the margin now that we filled in the header
  resize();

  // Hide the loading screen
  $('#js-loading').css('opacity','0');
  setTimeout(function() { 
    $('#js-loading').css('display','none')
  }, 2000);
}

// =====
// Destroy the data and re-init (using for dev)
// =====

function refresh() {
  localStorage.setItem('Report','');
  init();
}

// =====
// Let's go!
// =====

(function() {
  console.log("Starting up...")
  
  var savedData;
  savedData = localStorage.getItem('Report');

  // Does the user have a saved Report from a previous load?
  if (savedData !== null && savedData !== "") {
    console.log("Found a saved Report, checking how long ago...")
    // They have a saved Report, parse our data and use it
    savedData = JSON.parse(savedData);

    var cachedAt,
        opener,
        stories,
        seconds;
    
    cachedAt = new Date(savedData['cachedAt']);
    opener = savedData['opener'];
    sections = savedData['sections'];

    // Check if it was longer than 5 minutes ago (300 seconds)
    seconds = Math.floor((new Date() - cachedAt) / 1000);
    console.log("Data is " + (seconds / 60) + " minutes old...")

    if (seconds < 300) {
      // It's less than 5 minutes old
      console.log("Data is fresh, less than 5 minutes old, using it...");
      makeReport(opener,sections);
    }
    else {
      // It's older than 5 minutes, make new data
      console.log("Data is older than 5 minutes, getting new data...");
      init();
    }
  }
  else {
    // No saved report, get the data from Google Sheets
    console.log("No saved Report, getting fresh data...")
    init();
  }
})();





