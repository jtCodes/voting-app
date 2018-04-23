const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM(`<!DOCTYPE html>`);
const $ = require('jquery')(window);
var express = require('express');
var router = express.Router();
const db = require('../db/database.js');

router.get('/', function (req, res, next) {
    res.render('createPoll', { layout: 'layouts/layout.hbs' });
});

router.post('/post', function (req, res, next) {
    insertPollInfo(req.body, (pid) => {
        res.redirect('/poll/' + pid)
    });
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
            /* 
            TODO:

            setTimeout(function() {
                addOptions(body, pid)
            }, 10000);
            console.log("success1")
            */
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

module.exports = router;