const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM(`<!DOCTYPE html>`);
const $ = require('jQuery')(window);
var express = require('express');
var router = express.Router();

router.post('/createpoll', function (req, res, next) {
  const db = require('../db/database.js');
  const pollText = 'INSERT INTO poll(poll_name) VALUES($1)';
  const pollOptionText = 'INSERT INTO poll_option(option) VALUES';
  const values = [req.body.title];
  var optionValues = [];
  console.log(req.body);
  db.query(pollText, values, (err, result) => {
    if (err) {
      console.log(err.stack);
    } else {
      console.log("success");
    }
  })
  Object.keys(req.body).forEach(function (key, index) {
    // key: the name of the object key
    // index: the ordinal position of the key within the object 
    console.log(key, index)
    if (index > 0) {
      optionValues.push(req.body[key])
      console.log(req.body[key])
    }
  })
  console.log(optionValues)
  db.query(pollOptionText, optionValues, (err, result) => {
    if (err) {
      console.log("sql", err.stack);
    } else {
      console.log("success");
    }
    res.send("complete");
  })
});

module.exports = router;
