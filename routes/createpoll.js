const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM(`<!DOCTYPE html>`);
const $ = require("jquery")(window);
var express = require("express");
var router = express.Router();
const db = require("../db/database.js");
const dbq = require("../db/dbQueries");

router.get("/", (req, res, next) => {
  res.locals = {
    routeActive: {
      index: false,
      createpoll: true,
      trending: false
    }
  };
  res.render("createPoll", { layout: "layouts/indexLayout.hbs" });
});

router.post("/post", (req, res, next) => {
  dbq.insertPollInfo(req.body, pid => {
    res.redirect("/poll/" + pid);
  });
});

module.exports = router;
