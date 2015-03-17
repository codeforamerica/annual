var express = require('express');
var fs = require('fs');

var _ = require('underscore');
var cons = require('consolidate');
var app = express();

var getData = require('./getData.js');

var Report;
Report = getData();

function checkData(){
  // The time when we got the data
  created = new Date(Report['created']);
  // How many seconds ago we got the data
  seconds = Math.floor((new Date() - created) / 1000);
  console.log('Data is ' + seconds + ' seconds old...')
  if (seconds > 300) {
    // More than 5 minutes ago
    console.log('\nData out of date, getting new data...');
    Report = getData();
  }
}

app.engine('html', cons.underscore);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static('public'));

app.get('/', function(req, res){
  checkData();
  res.render('index', {
    title: 'Consolidate.js',
    data: Report,
    partials: {
      header: 'partials/header',
      footer: 'partials/footer'
    }
  });
});

app.get('/category/:id', function (req, res) {
  checkData();
  res.render('category', {
    title: 'Consolidate.js',
    requested: req.params.id,
    data: Report,
    partials: {
      header: 'partials/header',
      footer: 'partials/footer'
    }
  });
});

app.get('/story/:id', function (req, res) {
  checkData();
  res.render('story', {
    title: 'Consolidate.js',
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