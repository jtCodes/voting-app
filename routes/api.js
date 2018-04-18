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

router.get('/vote/info/:id', function (req, res, next) {
    var id = req.params.id;
    getVoteInfo(id, (voteInfo) => {
        res.send({ "voteInfo": voteInfo })
    });
});

router.post('/vote/post', function (req, res, next) {
    var url = req.headers.referer
    var index = url.lastIndexOf("/");
    var pollID = url.substr(index)
    
    const text = 'INSERT INTO poll_vote (pid, oid) VALUES ($1, $2)';
    let values = [parseInt(pollID.substr(1)), parseInt(req.body.option)]

    db.query(text, values, (err, result) => {
        if (err) {
            console.log("sql", err.stack);
        } else {
            console.log("success");
            res.redirect('/poll/chart' + pollID)
        }
    })
});

//get title of matching pid from db

//TODO: FIX THE DB MESS - NAMING, STUCTURING

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

//TODO: FIX THE DB MESS - NAMING, STUCTURING
// mayber don't need oid

function getVoteInfo(pid, callback) {
    const voteInfo = 'SELECT poll_vote.oid, title, poll_option.option, poll_vote.pid, COUNT(poll_vote.oid) AS tally FROM ' + 
    'poll, poll_option, poll_vote WHERE poll_vote.pid =' + pid + 'AND poll_option.pid =' + pid + 'AND poll.pid = poll_vote.pid AND poll_vote.oid = poll_option.option_num GROUP BY title, poll_option.option, poll_vote.pid, poll_vote.oid ORDER BY poll_vote.oid ASC;'

    db.query(voteInfo, (err, res) => {
        if (err) {
            console.log("sql", err.stack);
        } else {
            callback(res.rows)
        }
    })
}

module.exports = router;