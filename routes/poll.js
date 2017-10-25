const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM(`<!DOCTYPE html>`);
const $ = require('jQuery')(window);
var express = require('express');
var router = express.Router();
const db = require('../db/database.js');

router.get('/createpoll', function (req, res, next) {
  res.render('createPoll', { layout: 'layouts/layout.hbs' });
});

router.post('/createpoll/post', function (req, res, next) {
  insertPollInfo(req.body, (pid) => {
    console.log("pid", pid)
    res.redirect('/poll/1/')
  });
});

router.get('/1', function (req, res, next) {
  res.render('vote', { layout: 'layouts/voteLayout.hbs' });
});

router.get('/1/json', function (req, res, next) {
  getInfo(1, (title, options) => {
    res.send({ "title": title, "options":options })
  });
});

router.post('/vote/post', function (req, res, next) {
  res.send(req.body)
});

router.get('/chart', function (req, res, next) {
  res.render('chart', { layout: 'layouts/chartLayout.hbs' });
});

//insert poll title and poll options to db
function insertPollInfo(body, callback) {
  const pollText = 'INSERT INTO poll(title) VALUES($1) RETURNING pid';
  const pollValues = [body.title];

  db.query(pollText, pollValues, (err, result) => {
    if (err) {
      console.log(err.stack);
    } else {
      let pid = result.rows[0].pid;
      addOptions(body, pid)
      callback(pid)
    }
  })
}

//insert poll options to db
function addOptions(body, pid) {
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

//get title of matching pid from db
function getInfo(pid, callback) {
  const titleText = 'SELECT title FROM poll WHERE pid =' + pid;
  const optionText = 'SELECT * FROM poll_option WHERE pid =' + pid;

  db.query(titleText, (err, titleRes) => {
    if (err) {
      console.log("sql", err.stack);
    } else {
      db.query(optionText, (err, optionRes) => {
        if (err) {
          console.log("sql", err.stack);
        } else {
          callback(titleRes.rows[0].title, optionRes.rows);
        }
      })
    }
  })
}
module.exports = router;
