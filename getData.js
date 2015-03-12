var fs = require('fs');
var _ = require('underscore');
var Tabletop = require('tabletop');
var YAML = require('json2yaml');

var sheetUrl = 'https://docs.google.com/spreadsheets/d/1UTmofeY8rPZvXdN_CNJXfFgPlexiMmlSs5W8oPhqFko/pubhtml';

function onLoad(data, tabletop) {
  console.log( tabletop.foundSheetNames );

  // An array of sheets found
  // => ['sheet-name','Other Sheet','what's a sheet']
  var sheets = tabletop.foundSheetNames;

  // For each sheet, generate a collection jekyll can use
  _.each(sheets, function(sheet){
    // Get the objects (rows) in the sheet
    var objects;
    objects = tabletop.sheets(sheet).all();

    // Get an array of the column headers from the sheet, in order
    var columns;
    columns = tabletop.sheets(sheet).column_names;

    // Make a collection directory for that sheet
    var directory;
    directory = '_' + sheet;
    fs.mkdirSync('/' + directory);

    // For each object, save a YAML-formatted file in the directory
    _.each(objects, function(object){

      // If there's no 'unique-id' key/value, create a unique slug from the first key/value
      if (!object['unique-id']) {
        object = createUniqueId(object,columns);
      }

      // Turn it into YAML, with a template
      // ...

      fs.writeFile(directory + '/' + object['unique-id'], JSON.stringify(object), function (err) {
        if (err) throw err;
        console.log('It\'s saved!');
      });
    });
  });
};

// =====
// Create a unique key/value for an object from the first item
// =====

function createUniqueId(object,columns) {
  // Get the first column, in order from the Google Sheet
  column = _.first(columns);

  // Get the value for that column key
  var value;
  value = object[column];

  // Escape HTML characters
  value = _.escape(value);

  // Replace spaces with dashes, lowercase the string
  value = value.split(' ').join('-').toLowerCase();

  // Create a new key/value pair to put into the object
  var newPair = {};
  newPair =
  {
    'unique-id' : value
  };

  // Return the object with the new columnId
  return _.extend(object, newPair);
}

// =====
// Tabletop options
// =====

var options = {
  key: sheetUrl,
  callback: onLoad,
  simpleSheet: true
};

// =====
// Do the thing
// =====

Tabletop.init(options);