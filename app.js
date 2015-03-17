var express = require('express');
var fs = require('fs');
var chokidar = require('chokidar');
var _ = require('underscore');
var cons = require('consolidate');
var app = express();

// Load the Report
var Report = require('./data/Sheet.json');

// Watch the Report for changes
var watcher = chokidar.watch('data/Sheet.json', { persistent: true });
watcher.on('change', function(){
  Report = null;
  fs.readFile('data/Sheet.json', function (err, data) {
    if (err) throw err;
    console.log('\n\n\n=========\n\n\nFound new data, reloading data...\n\n\n=========\n\n\n');
    Report = JSON.parse(data);
  });
});

app.engine('html', cons.underscore);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static('public'));

app.get('/', function(req, res){
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