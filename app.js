var express = require('express');
var fs = require('fs');
var _ = require('underscore');
var cons = require('consolidate');
var app = express();

app.engine('html', cons.underscore);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static('public'));

app.get('/', function(req, res){
  fs.readFile('data/Sheet.json', function (err, data) {
    if (err) throw err;
    data = JSON.parse(data);
    res.render('index', {
      title: 'Consolidate.js',
      requested: req.params.id,
      data: data,
      partials: {
        header: 'partials/header',
        footer: 'partials/footer'
      }
    });
    
  });
});

app.get('/category/:id', function (req, res) {
  fs.readFile('data/Sheet.json', function (err, data) {
    if (err) throw err;
    data = JSON.parse(data);
    res.render('category', {
      title: 'Consolidate.js',
      requested: req.params.id,
      data: data,
      partials: {
        header: 'partials/header',
        footer: 'partials/footer'
      }
    });

  });
});

app.get('/story/:id', function (req, res) {
  fs.readFile('data/Sheet.json', function (err, data) {
    if (err) throw err;
    data = JSON.parse(data);
    res.render('story', {
      title: 'Consolidate.js',
      requested: req.params.id,
      data: data,
      partials: {
        header: 'partials/header',
        footer: 'partials/footer'
      }
    });
    
  });
});

app.listen(process.env.PORT || 3000);
console.log('Express server listening on port 3000');