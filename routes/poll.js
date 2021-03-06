const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM(`<!DOCTYPE html>`);
const $ = require('jquery')(window);
var express = require('express');
var router = express.Router();
const db = require('../db/database.js');

router.get('/:id', function (req, res, next) {
  res.render('vote', { layout: 'layouts/voteLayout.hbs' });
});

router.get('/chart/:id', function (req, res, next) {
  res.render('chart', { layout: 'layouts/chartLayout.hbs' });
});

module.exports = router;
