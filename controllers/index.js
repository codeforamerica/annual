var express = require('express'),
    router = express.Router(),
    Introduction = require('../models/introduction');

router.use('/categories', require('./categories'));
router.use('/stories', require('./stories'));

router.get('/', function(req, res){
  Introduction.get(function(err, response){
    res.render('index', {
      metadata: response.metdata, 
      introduction: response.introduction
    });
  });
});

module.exports = router;