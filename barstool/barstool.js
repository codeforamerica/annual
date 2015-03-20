var Tabletop = require('tabletop');
var fs = require('fs');

var mixers = {
  "url" : "https://docs.google.com/spreadsheets/d/1UTmofeY8rPZvXdN_CNJXfFgPlexiMmlSs5W8oPhqFko/pubhtml",
}

exports.fetch = function(callback) {

    // If /datastore/barstool exists:
    // ...
    
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


    // =====
    // Give the Tabletop model back, full of delicious data
    // =====

    function onLoad(data, tabletop) {
      console.log( 'Barstool loaded ' + tabletop.foundSheetNames );
      callback(null,tabletop);
    };

    // =====
    // Set our Tabletop options
    // =====

    var options = {
      key: mixers.url,
      callback: onLoad,
      simpleSheet: false
    };

    // =====
    // Start up Tabletop
    // =====

    Tabletop.init(options);
  }