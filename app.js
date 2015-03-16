var express = require('express');
var fs = require('fs');
var _ = require('underscore');
var cons = require('consolidate');
var app = express();
var Report = require('./data/Sheet.json');

app.engine('html', cons.underscore);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static('public'));

console.log(Report);
console.log('\n\n\n\n\n\n');
console.log(Report['opener'][0]['headline']);

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

// app.get('/users', function(req, res){
//   res.render('users', {
//     title: 'Users',
//     users: users
//   });
// });

app.listen(3000);
console.log('Express server listening on port 3000');