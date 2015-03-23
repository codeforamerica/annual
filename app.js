// Use express
var express = require('express');
var app = express();
var cons = require('consolidate');

// Allows us to use underscore in our views
var _ = require('underscore');
app.locals._ = _;

// Set up our view engine, EJS using consolidate.js template helper
app.engine('html', cons.ejs);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// Set up our routes
app.use(express.static('public'));
app.use(require('./controllers'))

app.listen(process.env.PORT || 3000);
console.log('Express server listening on port 3000');