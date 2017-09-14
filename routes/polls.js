const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM(`<!DOCTYPE html>`);
const $ = require('jQuery')(window);
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  const db = require('../db/database.js');
  const text = 'INSERT INTO poll(poll_name) VALUES($1)';
  const values = ["wtf"];

  res.render('index');
  $(".test").click(function () {
    console.log("Handler for .click() called.");
    db.query(text, values, (err, result) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log("success");
      }
    })
  });
});

module.exports = router;
