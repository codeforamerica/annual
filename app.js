var express = require('express');
var fs = require('fs');
var Tabletop = require('tabletop');

var _ = require('underscore');
var cons = require('consolidate');
var app = express();
app.locals._ = _;

var getData = require('./getData.js');

var Report;
getData(function(err,results){
  Report = results;
});


function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}


function checkData(){
  if (_.isEmpty(Report)) {
    getData(function(err,results){
      Report = results;
    });
  } else {
    // The time when we got the data
    created = new Date(Report['created']);
    // How many seconds ago we got the data
    seconds = Math.floor((new Date() - created) / 1000);
    console.log('Data is ' + seconds + ' seconds old...')
    if (seconds > 20) {
      // More than 5 minutes ago
      console.log('\nData out of date, getting new data...');
      getData(function(err,results){
        Report = results;
        console.log('We\'ve got data!');

      });
    }
  }
}

app.engine('html', cons.ejs);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static('public'));

// =====
// Routes
// =====

// Force a data update
app.get('/update', function (req, res) {
  checkData();
  res.send('Updating data...');
});

// Check if the data is valid on all routes before handing
app.get(['/','/category/:id','/story/:id'], function(req, res, next){
  if (_.isEmpty(Report)) {
    res.render('error/loading', {
      title: 'Loading',
      partials: {
        header: 'partials/header',
        footer: 'partials/footer'
      }
    });
    checkData();
  } else {
    next();
  }
});

// Get the homepage
app.get('/', function(req, res) {
  res.render('index', {
    title: 'Home', //what does this do?
    type: 'home',
    url: req.originalUrl,
    data: Report,
    partials: {
      header: 'partials/header',
      footer: 'partials/footer'
    }
  });
});

// Get various static pages with custom templates
app.get('/about-us', function(req, res) {
  res.render('about-us', {
    title: 'about-us',
    type: 'about-us',
    url: req.originalUrl,
    requested: 'about-us',
    data: Report,
    partials: {
      header: 'partials/header',
      footer: 'partials/footer'
    }
  });
});
app.get('/resources', function(req, res) {
  res.render('resources', {
    title: 'Resources',
    type: 'resources',
    url: req.originalUrl,
    requested: 'resources',
    data: Report,
    partials: {
      header: 'partials/header',
      footer: 'partials/footer'
    }
  });
});
app.get('/updates', function(req, res, next) {
  res.render('updates', {
    title: 'Updates',
    type: 'updates',
    url: req.originalUrl,
    requested: 'updates',
    data: Report,
    partials: {
      header: 'partials/header',
      footer: 'partials/footer'
    }
  });
});

// Redirects the /iopenarchitecture page to a custom external URL
app.get('/iopenarchitecture', function(req, res, next) {
  res.redirect('https://www.iopenarchitecture.org/');
});

// Get a specific story
app.get('/story/:id', function (req, res) {
  res.render('story', {
    requested: req.params.id,
    type: 'story',
    url: req.originalUrl,
    data: Report,
    partials: {
      header: 'partials/header',
      footer: 'partials/footer'
    }
  });
});

// Get a specific update
app.get('/updates/:id', function (req, res) {
  res.render('update', {
    requested: req.params.id,
    type: 'update',
    url: req.originalUrl,
    data: Report,
    partials: {
      header: 'partials/header',
      footer: 'partials/footer'
    }
  });
});

// Try to dynamically route to the right chapter, if available
app.get('/:id', function (req, res, next) {
  // Try to find this ID in the chapters page
  var requested = _.findWhere(Report['chapters'], { 'unique-id' : req.params.id });
  // If requested is an object, that means there is a chapter with this ID. Return it.
  if (typeof(requested) === "object") {
    res.render('category', {    // categories are the individual chapter pages
      requested: req.params.id,
      type: 'category',
      url: req.originalUrl,
      data: Report,
      partials: {
        header: 'partials/header',
        footer: 'partials/footer'
      }
    });
  }
  // Otherwise, next route
  else {
    next();
  }
});

// Try to dynamically route to the right custom page, if available
app.get('/:id', function (req, res, next) {
  // Try to find this ID in the pages page
  var requested = _.findWhere(Report['pages'], { 'unique-id' : req.params.id });
  // If requested is an object, that means there is a page with this ID. Return it.
  if (typeof(requested) === "object") {
    res.render('htmlpage', {
      title: 'OAC',
      type: 'htmlpage',
      url: req.originalUrl,
      requested: req.params.id,
      data: Report,
      partials: {
        header: 'partials/header',
        footer: 'partials/footer'
      }
    });
  }
  // Otherwise, next route
  else {
    next();
  }
});

// Last route to catch on this ... we couldn't find anything so serve a 404
app.get('/:id', function (req, res) {
  res.status(404).render('error/404', {
   url: req.originalUrl,
  });
});

// =====
// Error handling
// =====

// Catch 404
app.use(function(req, res, next) {
  res.status(404).render('error/404', {
   url: req.originalUrl,
  });
});

// Catch 500
// Catch 500
app.use(function(error, req, res, next) {
  res.status(500).render('error/500', {
    error: error
  });
});

app.listen(process.env.PORT || 3000);
console.log('Express server listening on port 3000');
