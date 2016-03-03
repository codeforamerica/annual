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

app.get('/', function(req, res){

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

app.get('/category/:id', function (req, res) {
  if (req.params.id == '2015-activity') {
    res.render('people', {
      title: 'People',
      type: 'people',
      url: req.originalUrl,
      requested: req.params.id,
      data: Report,
      partials: {
        header: 'partials/header',
        footer: 'partials/footer'
      }
    });
  } else if (req.params.id == 'resources') {
    res.render('resources', {
      title: 'Resources',
      type: 'resources',
      url: req.originalUrl,
      requested: req.params.id,
      data: Report,
      partials: {
        header: 'partials/header',
        footer: 'partials/footer'
      }
    });
  } else if (req.params.id == 'updates') {
    res.render('updates', {
      title: 'Updates',
      type: 'updates',
      url: req.originalUrl,
      requested: req.params.id,
      data: Report,
      partials: {
        header: 'partials/header',
        footer: 'partials/footer'
      }
    });
  /* } else if (req.params.id == 'what-you-can-do') {
    res.render('closer', {
      title: 'What You Can Do',
      type: 'closer',
      url: req.originalUrl,
      requested: req.params.id,
      data: Report,
      partials: {
        header: 'partials/header',
        footer: 'partials/footer',
        charts: 'partials/charts'
      }
    });*/
  } else {
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
});

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

app.get('/update', function (req, res) {
  checkData();
  res.send('Updating data...');
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