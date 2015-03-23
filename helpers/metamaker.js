// Produces metadata used to generate the nav, table of contents, and next section

var _ = require('underscore'),
    metadata = {};

exports.make = function(type, active, data, callback) {
  buildNav(active, data, function(err,nav){
    metadata['nav-sections'] = nav;
  });

  buildNext(active, data, function(err,next){
    metadata['next-section'] = next;
  });

  callback(null,metadata);
}

function buildNav(active, data, cb) {
  var nav = {};

  // A bit of a gross patch to add the intro section on to the nav
  var introduction = {};
  introduction['name'] = data['opener'][0]['category'];
  introduction['color'] = data['opener'][0]['color'];
  introduction['class'] = "";
  introduction['anchor-url'] = "/";
  if (active == "introduction") {
    introduction['class'] = 'active';
  }
  nav['introduction'] = introduction;

  _.each(data['categories'], function(category){    
    var pushing = {};
    pushing['name'] = category['category'];
    pushing['color'] = category['color'];
    pushing['class'] = "";
    pushing['anchor-url'] = '/categories/' + category['unique-id'];

    if (category['unique-id'] == active) {
      pushing['class'] = 'active';
    }

    // Push it into nav
    var uid = category['unique-id'];
    nav[uid] = pushing;
  });

  cb(null,nav);
}


function buildNext(active, data, cb) {
  var next = {};

  var currentIndex,
      nextIndex,
      indexLength,
      currentObject;

  currentObject = _.where(data['categories'], {"unique-id":active})
  console.log(data['categories']);
  currentIndex = _.indexOf(data['categories'], currentObject);
  console.log(currentIndex);
  nextIndex = currentIndex + 1;
  indexLength = data['categories'].length - 1;

  if (nextIndex <= indexLength) {
    var next_object = data['categories'][nextIndex];

    next['name'] = next_object['category'];
    next['headline'] = next_object['headline'];
    next['color'] = next_object['color'];
    next['anchor-url'] = '/categories/' + next_object['unique-id'];
    
    cb(null,next);
  } else {
    cb(null,next);
  }
}