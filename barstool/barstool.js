var Tabletop = require('tabletop'),
    fs = require('fs'),
    _ = require('underscore'),
    mixers,
    created,
    created_seconds,
    cache_seconds,
    options,
    Sheet = {};

// =====
// Basic settings for our app, should load from .env files later
// =====

mixers = {
  "url" : "https://docs.google.com/spreadsheets/d/1UTmofeY8rPZvXdN_CNJXfFgPlexiMmlSs5W8oPhqFko/pubhtml",
  "cache_minutes" : 5
};

exports.fetch = function(callback) {

    // Read /data/cache
    fs.readFile(__dirname + '/data/cache', "utf-8", function (err, dats) {    
      // Blurgh, something is wrong
      if (err) throw err;

      if (dats == "") {
        console.log('@@@- No data cached, Barstool is getting the data.');
        loadSheet(function(err,data){
          callback(null,data);
        });
      }
      else {
        // Looking good
        dats = JSON.parse(dats);

        // Check if the data is onLoad
        // the time when we got the data
        created = new Date(dats["created"]);
        // how many seconds ago we got the data
        created_seconds = Math.floor((new Date() - created) / 1000);
        // how long to keep the data, in seconds
        cache_seconds = Math.floor((mixers.cache_minutes) * 60);

        console.log('@@@- The data is '+ created_seconds +' seconds old.');

        if (created_seconds > cache_seconds) {
          console.log('@@@- Barstool is refreshing the data.');
          loadSheet(function(err,data){
            callback(null,data);
          });
        }
        else {
          console.log('@@@- Barstool is sending the cached data.');
          callback(null,dats);
        }
      }
    });
    
      // Check if datafile it was saved within the last 5 minutes
      // ...

        // It was saved in the last five minutes!
        // => Return it

        // It wasn't saved in the last five minutes.
        // => Load the data
        // => Return it
        // => Save it

    // If /data/barstool doesn't exist:
    // ...

        // => Load the data
        // => Return it
        // => Save it

    function loadSheet(cb) {
      // =====
      // Set our Tabletop options
      // =====

      var options = {
        key: mixers.url,
        callback: onLoad,
        simpleSheet: false
      };

      // =====
      // Give the Tabletop model back, with delicious data
      // =====

      function onLoad(data, tabletop) {
        console.log( '@@@- Barstool loaded ' + tabletop.foundSheetNames );
        tabletop["created"] = new Date();

        makeSheets(tabletop, function(err,Sheet){
          fs.writeFile(__dirname + '/data/cache', JSON.stringify(Sheet), function (err) {
            if (err) throw err;
            console.log('@@@- Barstool saved the data.');
            cb(null,Sheet);
          });
        });
      }

      function makeSheets(tabletop, cbx) {
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

        Sheet['created'] = new Date();
        cbx(null,Sheet);
      }

      function createUniqueId(object,columns) {
        // Get the first column, in order from the Google Sheet
        column = _.first(columns);

        // Get the value for that column key
        var value;
        value = object[column];

        // Remove non-alphanumeric characters, except for spaces
        value = value.replace(/[^\w\s]/gi, '')

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
      // Start up Tabletop
      // =====

      Tabletop.init(options);
    }

  }