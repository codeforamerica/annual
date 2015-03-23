var express = require('express'),
    router = express.Router(),
    Story = require('../models/story');

router.get('/:id', function (req, res) {

  Story.get(req.params.id, function(err, response){
    res.render('stories/story', {
      metadata: response.metdata, 
      story: response.story
    });
  });

});

module.exports = router;