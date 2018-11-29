var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.locals = {
    routeActive: {
      index: true,
      createpoll: false,
      trending: false
    }
  };
  res.render('index', { layout: 'layouts/indexLayout.hbs' });
});

module.exports = router;
