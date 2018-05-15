const db = require("../db/database.js");

module.exports = {
  /**
   *   Retrieve the title and poll options for the given pid.
   *   @param {int} pid - poll id
   *   @param {function(string, object)} callback - after successfully retrieving from the db,
   *    title is returned as a string and poll options returned as an object
   **/
  getPollInfo: function(pid, callback) {
    const titleQuery = "SELECT title FROM poll WHERE pid = $1";
    const optionQuery = "SELECT * FROM poll_option WHERE pid = $1";
    let values = [pid];
    db.query(titleQuery, values, (err, titleRes) => {
      if (err) {
        console.log("sql", err.stack);
      } else {
        db.query(optionQuery, values, (err, optionRes) => {
          if (err) {
            console.log("sql", err.stack);
          } else {
            callback(titleRes.rows[0].title, optionRes.rows);
          }
        });
      }
    });
  },

  /**
   *   Retrieve all the relevant info needed to for data visualization.
   *   @param {int} pid - poll id
   *   @param {function(object)} callback - the callback that handles the returned object
   *
   **/
  getVoteInfo: function(pid, callback) {
    const voteInfoQuery =
      "SELECT poll_vote.oid, title, poll_option.option, poll_vote.pid, COUNT(poll_vote.oid) " + 
      "AS tally FROM poll, poll_option, poll_vote " + 
      "WHERE poll_vote.pid = $1 " + 
      "AND poll_option.pid = $2 " + 
      "AND poll.pid = poll_vote.pid " + 
      "AND poll_vote.oid = poll_option.option_num " + 
      "GROUP BY title, poll_option.option, poll_vote.pid, poll_vote.oid " + 
      "ORDER BY poll_vote.oid ASC;";
      
    let values = [pid, pid];
    db.query(voteInfoQuery, values, (err, res) => {
      if (err) {
        console.log("sql", err.stack);
      } else {
        callback(res.rows);
      }
    });
  },

  /**
   *   Insert vote into the db
   *   @param {int} pid - poll id retrieved from the url in the form '/pid'
   *   @param {int} oid - option id
   *   @param {function()} callback - a callback to run
   **/
  insertVote: function(pid, oid, callback) {
    const query = "INSERT INTO poll_vote (pid, oid) VALUES ($1, $2)";
    let values = [parseInt(pid.substring(1)), parseInt(oid)];

    db.query(query, values, (err, result) => {
      if (err) {
        console.log("sql", err.stack);
      } else {
        callback();
      }
    });
  },

  /**
   *   Insert poll title, options into db
   *   @param {int} body - body of the post request containing the title and poll options
   *   @param {function(pid)} callback - call after all poll options are inserted
   **/
  insertPollInfo: function(body, callback) {
    const pollText = "INSERT INTO poll(title) VALUES($1) RETURNING pid";
    const pollOptionText =
      "INSERT INTO poll_option(pid,option,option_num) VALUES ($1, $2, $3)";
    const pollValues = [body.title];

    db.query(pollText, pollValues, (err, result) => {
      if (err) {
        console.log("sql", err.stack);
      } else {
        let pid = result.rows[0].pid;

        // callback function depends on all queries being done, so wrap around promise all to know when
        // problem: foreach does a query for each key, calling callback each time!
        // foreach loop is not async, db query is async
        let insertPollOptionsPromises = Promise.all(
          Object.keys(body).map(function(key, index) {
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
              });
            }
          })
        );
        insertPollOptionsPromises.then(() => callback(pid));
      }
    });
  }
};
