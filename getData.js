var _ = require('underscore');
var Tabletop = require('tabletop');

module.exports = 

  function(callback) {
     var sheetUrl = 'https://docs.google.com/spreadsheets/d/1MJljMlCyf34BddJoFsCgkCFb3XpYD4bt_a-LDe_S3AA/pubhtml';
     // the above is the live data site
     //var sheetUrl = 'https://docs.google.com/spreadsheets/d/1m6BxCUb1nxf4dVNP3S8PFhUgalBNstpE3em83P2DC3I/pubhtml'; //Phidens doc
   
    var Sheet = {};

    // =====
    // Handle the data
    // =====

    function onLoad(data, tabletop) {
      
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
        
        //console.log(Sheet[sheet]);

      }); // end each sheets

      Sheet['created'] = new Date();
      
      deSerializePeopleObject(Sheet); //hack
      
      callback(null,Sheet);
    };

    // =====
    // deserealize string used for people object. hacky solution, but we cannot make a new table for it, so it will have to do
    // =====
    
    function deSerializePeopleObject(dataObject){
  	//hack
    
		var categories = dataObject['categories'];
	
		for (index = 0, len = categories.length; index < len; ++index) {
		
			var category = categories[index];
			
			if(category['category'] == 'About Us'){
		
				var peopleObject = category['headline'];
				category['headline'] = JSON.parse(peopleObject);
			
			}
		}
    }
    
	// =====
    // Create a unique key/value for an object from the first item
    // =====
    

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
  }
