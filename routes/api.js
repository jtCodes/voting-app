const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM(`<!DOCTYPE html>`);
const $ = require('jquery')(window);
var express = require('express');
var router = express.Router();
const db = require('../db/database.js');

router.get('/poll/:id', function (req, res, next) {
    var id = req.params.id;
    getInfo(id, (title, options) => {
        res.send({ "title": title, "options": options })
    });
});

router.get('/chart/:id', function (req, res, next) {
    res.render('chart', { layout: 'layouts/chartLayout.hbs' });
});

router.post('/vote/post', function (req, res, next) {
    var url = req.headers.referer
    var index = url.lastIndexOf("/");
    var pollID = url.substr(index)

    const text = 'INSERT INTO poll_vote (poll_id, option_id) VALUES ($1, $2)';
    let values = [parseInt(req.body.option),parseInt(pollID.substr(1))]

    db.query(text, values, (err, result) => {
        if (err) {
            console.log("sql", err.stack);
        } else {
            console.log("success");
            res.redirect('/api/chart' + pollID)
        }
    })
});

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