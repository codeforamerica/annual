var express = require('express');
var fs = require('fs');
var Tabletop = require('tabletop');

var _ = require('underscore');
var cons = require('consolidate');
var app = express();

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
        console.log(results);
      });
    }
  }
}

app.engine('html', cons.underscore);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static('public'));

app.get(['/','/category/:id','/story/:id'], function(req, res, next){
  if (_.isEmpty(Report)) {
    res.render('loading', {
      title: 'Loading',
      partials: {
        header: 'partials/header',
        footer: 'partials/footer'
      }
    });
    checkData();
  } else {
    checkData();
    next();
  }
});

app.get('/', function(req, res){
  res.render('index', {
    title: 'Intro',
    data: Report,
    partials: {
      header: 'partials/header',
      footer: 'partials/footer'
    }
  });
});

app.get('/category/:id', function (req, res) {
  if (req.params.id == '2014-at-a-glance') {
    res.render('timeline', {
      title: 'Timeline',
      requested: req.params.id,
      data: Report,
      partials: {
        header: 'partials/header',
        footer: 'partials/footer'
      }
    });
  } else {
    res.render('category', {
      title: 'Category',
      requested: req.params.id,
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
    title: 'Story',
    requested: req.params.id,
    data: Report,
    partials: {
      header: 'partials/header',
      footer: 'partials/footer'
    }
  });
});

app.listen(process.env.PORT || 3000);
console.log('Express server listening on port 3000');