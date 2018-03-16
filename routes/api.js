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
    
    const text = 'INSERT INTO poll_vote (poll_id, option_id) VALUES ($1, $2)';
    let values = [parseInt(pollID.substr(1)), parseInt(req.body.option)]

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

//TODO: FIX THE DB MESS - NAMING, STUCTURING

function getInfo(pid, callback) {
    const titleText = 'SELECT title FROM poll WHERE pid =' + pid;
    const optionText = 'SELECT * FROM poll_option WHERE pid =' + pid;
    const voteInfo = 'SELECT title, poll_option.option, poll_option.pid FROM poll, poll_option, poll_vote WHERE poll_option.pid =' + 
    pid + 'AND poll_vote.poll_id =' + pid + 'AND poll.pid = poll_vote.poll_id GROUP BY poll.title, poll_option.option, poll_option.pid'

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

function getVoteInfo(pid, callback) {
    const voteInfo = 'SELECT poll_vote.option_id, title, poll_option.option, poll_vote.poll_id, COUNT(poll_vote.option_id) AS tally FROM ' + 
    'poll, poll_option, poll_vote WHERE poll_vote.poll_id =' + pid + 'AND poll_option.pid =' + pid + 'AND poll.pid = poll_vote.poll_id AND poll_vote.option_id = poll_option.option_num GROUP BY title, poll_option.option, poll_vote.poll_id, poll_vote.option_id ORDER BY option_id ASC;'

    db.query(voteInfo, (err, res) => {
        if (err) {
            console.log("sql", err.stack);
        } else {
            callback(res.rows)
        }
    })
}

module.exports = router;