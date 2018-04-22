const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM(`<!DOCTYPE html>`);
const $ = require("jquery")(window);
const express = require("express");
const router = express.Router();
const db = require("../db/database.js");
const dbq = require("../db/dbQueries.js");

router.get("/poll/:id", function(req, res, next) {
  let pid = req.params.id;
  dbq.getPollInfo(pid, (title, options) => {
    res.send({ title: title, options: options });
  });
});

router.get("/vote/info/:id", function(req, res, next) {
  var pid = req.params.id;
  dbq.getVoteInfo(pid, voteInfo => {
    res.send({ voteInfo: voteInfo });
  });
});

router.post("/vote/post", function(req, res, next) {
  var url = req.headers.referer;
  var index = url.lastIndexOf("/");
  var pid = url.substr(index);
  var oid = req.body.option;

  dbq.insertVote(pid, oid, () => {
    res.redirect("/poll/chart" + pid);
  });
});

module.exports = router;
