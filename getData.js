var fs = require('fs');
var _ = require('underscore');
var YAML = require('yamljs');
var Tabletop = require('tabletop');

var sheetUrl = 'https://docs.google.com/spreadsheets/d/1UTmofeY8rPZvXdN_CNJXfFgPlexiMmlSs5W8oPhqFko/pubhtml';

// =====
// Handle the data
// =====

function onLoad(data, tabletop) {
  var Sheet = {};
  console.log( 'Found ' + tabletop.foundSheetNames );

  // An array of sheets found
  // => ['sheet-name','Other Sheet','that's a sheet']
  var sheets = tabletop.foundSheetNames;

  // For each sheet, generate a collection jekyll can use
  _.each(sheets, function(sheet){
    // Get the objects (rows) in the sheet
    var objects;
    objects = tabletop.sheets(sheet).all();

    // Get an array of the column headers from the sheet, in the correct order
    // We do this because JS doesn't necessary require entries in an object to be read in order
    // We'll use this below to create a unique ID from the first column, if needed
    var columns;
    columns = tabletop.sheets(sheet).column_names;

    // For each object, make sure we have a unique id. If not, make one.
    _.each(objects, function(object){
      // If the 'unique-id' key doesn't exist, create a unique id from the first column key/value
      if (!object['unique-id']) {
        object = createUniqueId(object,columns);
      }
    }); // end each objects

    // Insert our sheet and its objects (rows) into the Sheet object
    Sheet[sheet] = objects;

  }); // end each sheets

  Sheet = JSON.stringify(Sheet, null, 2);

  fs.writeFile('data/Sheet.json', Sheet, function (err) {
    if (err) throw err;
    console.log('It\'s saved!');
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