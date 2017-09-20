const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM(`<!DOCTYPE html>`);
const $ = require('jQuery')(window);
var express = require('express');
var router = express.Router();

router.get('/createpoll', function (req, res, next) {
  res.render('createPoll');
});

router.post('/createpoll/post', function (req, res, next) {
  const db = require('../db/database.js');

  insertInfo(db, req.body);
  res.redirect('/poll/chart')
});

router.get('/chart', function (req, res, next) {
  res.render('chart', { layout: 'chartLayout.hbs' });
});

function insertInfo(db, body) {
  const pollText = 'INSERT INTO poll(title) VALUES($1) RETURNING pid';
  const pollValues = [body.title];

  db.query(pollText, pollValues, (err, result) => {
    if (err) {
      console.log(err.stack);
    } else {
      console.log("success", result.rows[0].pid);
      addOptions(db, body, result.rows[0].pid);
    }
  })
}
function addOptions(db, body, pid) {
  const pollOptionText = 'INSERT INTO poll_option(pid,option,option_num) VALUES ($1, $2, $3)';
  Object.keys(body).forEach(function (key, index) {
    // key: the name of the object key
    // index: the ordinal position of the key within the object 
    console.log(key, index)
    if (index > 0) {
      var optionValues = [];

      optionValues.push(pid, body[key], index);

      db.query(pollOptionText, optionValues, (err, result) => {
        if (err) {
          console.log("sql", err.stack);
        } else {
          console.log("success");
        }
      })
    }
  })
}

module.exports = router;
