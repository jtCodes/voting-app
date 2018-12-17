$(document).ready(function () {
    var url = window.location.href;
    var index = url.lastIndexOf("/");
    var pollID = url.substr(index);
    fetchPollInfo(pollID);
})

//fetch the poll title and options corresponding to the poll id
function fetchPollInfo(pollID) {
    const host = location.protocol + '//' + location.host + '/';
    //const deploy = 'https://anonvote.herokuapp.com/'
    console.log(host + "api/poll" + pollID);
    $.ajax({
        url: host + "api/poll" + pollID,
        type: 'GET',
        success: function (res) {
            console.log(res);
            console.log(res.options[0]);
            console.log(res.options[0].oid);
            console.log(res.options.length);
            console.log("sucess");

            //build poll
            $('.vote-poll-title-insert').html("<h2 class='vote-poll-title'>" + res.title + "</h2>");
            
            var pollOption = "";
            for (i = 0; i < res.options.length; i++) {
                pollOption += "<div class='form-check'> <label class='form-check-label radio'> <input class='form-check-input custom-radio' type='radio' name='option' id='option' value=" +
                    res.options[i].option_num + " data-toggle='radio' required>" + res.options[i].option + " </label> </div>";
            }
            $('.vote-poll-options-insert').html(pollOption);
            // Custom radios
            $('[data-toggle="radio"]').radiocheck();
        }
    });
}