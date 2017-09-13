var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const db = require('../db/database.js');
  const text = 'INSERT INTO polls(poll_name) VALUES($1)';
  const values = ["wtf"];
  db.query(text, values, (err, result) => {
    if (err) {
      console.log(err.stack);
    } else {
        console.log("success");
        res.render('index', { title: values[0] });
    }
  })
});

module.exports = router;
