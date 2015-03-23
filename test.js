var barstool = require('./barstool/barstool'),
    _ = require('underscore');

barstool.fetch(function (err,Sheet) {
  
  console.log( Sheet['opener'] );
});