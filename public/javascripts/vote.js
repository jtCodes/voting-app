$(document).ready(function () {
    var url = window.location.href
    var index = url.lastIndexOf("/");
    var pollID = url.substr(index)
    fetch(pollID)
})

function fetch(pollID) {
    const local = 'http://localhost:3000/'
    const deploy = 'https://anonvote.herokuapp.com/'
    $.ajax({
        url: deploy + "api/poll" + pollID,
        type: 'GET',
        success: function (res) {
            console.log(res);
            console.log(res.options[0])
            console.log(res.options[0].oid)
            console.log(res.options.length)
            console.log("sucess");

            var html = ""
            //build the page
            html += "<h2 class='poll-title'>" + res.title + "</h2>"
            for (i = 0; i < res.options.length; i++) {
                html += "<div class='form-check'> <label class='form-check-label'> <input class='form-check-input' type='radio' name='option' id='option' value="
                    + res.options[i].option_num + " unchecked> " + res.options[i].option + " </label> </div>"
            }
            $('.poll').html(html)
        }
    });
}