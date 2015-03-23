var barstool = require('../barstool/barstool'),
    _ = require('underscore'),
    color = require('../helpers/color'),
    metamaker = require('../helpers/metamaker'),
    metadata_data = {},
    category_data = {};

// Need to return well-formatted category
// Need to return metadata for titlebar, nav, next section

exports.get = function(category, callback) {
  barstool.fetch(function (err, Sheet) {
    
    formatData(category, Sheet, function(err, response){
      if (err) throw err;
      callback(null,response);
    });

  });

  function formatData(category, Sheet, cb) {
    
    // Get the data for this category
    _.each(Sheet['categories'], function(cat){
      if (cat['unique-id'] == category) {
        category_data = cat;
      }
    });

    // Get the stories for this category
    category_data['stories'] = [];
    _.each(Sheet['stories'], function(story){
      if (story['category'] == category_data['category']) {
        (category_data['stories']).push(story);
      }
    });

    // Make the metadata
    metamaker.make('category', category, Sheet, function(err,meta){
      if (err) throw err;
      metadata_data = meta;
    });

    // Produce a dark-shade color for the header
    color.shade(category_data['color'], -0.3, function(err,darkColor){
      if (err) throw err;
      metadata_data['dark-color'] = darkColor;
    });

    // Send it back
    cb(null,{
      metadata: metadata_data,
      category: category_data
    });
  }
}