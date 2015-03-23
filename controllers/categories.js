var express = require('express'),
    router = express.Router(),
    Category = require('../models/category');

router.get('/:id', function (req, res) {

  Category.get(req.params.id, function(err, response){

    // Special cases
    if (req.params.id == '2014-at-a-glance') {
      res.render('categories/timeline', {
        metadata: response.metadata, 
        category: response.category
      });
    }
    else if (req.params.id == 'supporters') {
      res.render('categories/supporters', {
        metadata: response.metadata, 
        category: response.category
      });
    }
    else if (req.params.id == 'financials') {
      res.render('categories/financials', {
        metadata: response.metadata, 
        category: response.category
      });
    }
    // Default case
    else {
      res.render('categories/category', {
        metadata: response.metadata, 
        category: response.category
      });
    }

  });

  // if (req.params.id == '2014-at-a-glance') {
  //   res.render('timeline', {
  //     title: 'Timeline',
  //     requested: req.params.id,
  //     data: Report,
  //     partials: {
  //       header: 'partials/header',
  //       footer: 'partials/footer'
  //     }
  //   });
  // } else if (req.params.id == 'supporters') {
  //   res.render('supporters', {
  //     title: 'Supporters',
  //     requested: req.params.id,
  //     data: Report,
  //     partials: {
  //       header: 'partials/header',
  //       footer: 'partials/footer'
  //     }
  //   });
  // } else if (req.params.id == 'financials') {
  //   res.render('financials', {
  //     title: 'Financials',
  //     requested: req.params.id,
  //     data: Report,
  //     partials: {
  //       header: 'partials/header',
  //       footer: 'partials/footer',
  //       charts: 'partials/charts'
  //     }
  //   });
  // } else {
  //   res.render('category', {
  //     requested: req.params.id,
  //     data: Report,
  //     partials: {
  //       header: 'partials/header',
  //       footer: 'partials/footer'
  //     }
  //   });
  // }

});

module.exports = router;