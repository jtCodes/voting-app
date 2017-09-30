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
  insertInfo(req.body, (pid) => {
    console.log( "pid", pid)
    res.redirect('/poll/1');
  });
});

router.get('/1', function (req, res, next) {
  res.render('vote', { layout: 'layouts/voteLayout.hbs' });
});

router.get('/1/json', function (req, res, next) {
  getInfo((result) => {
    res.send({"result": result })
  });
});

router.post('/vote/post', function (req, res, next) {
  res.send(req.body)
});

router.get('/chart', function (req, res, next) {
  res.render('chart', { layout: 'layouts/chartLayout.hbs' });
});

//insert poll title and poll options to db
function insertInfo(body, callback) {
  const pollText = 'INSERT INTO poll(title) VALUES($1) RETURNING pid';
  const pollValues = [body.title];

  db.query(pollText, pollValues, (err, result) => {
    if (err) {
      console.log(err.stack);
    } else {
      let pid = result.rows[0].pid;
      addOptions(body, pid, ()=> {
        callback(pid);
      })
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
function getInfo(callback) {
  const text = 'SELECT title FROM poll WHERE pid = 1';
  let pid = [1];

  db.query(text, (err, result) => {
    if (err) {
      console.log("sql", err.stack);
      callback();
    } else {
      callback(result.rows[0].title);
    }
  })
}
module.exports = router;
