$(document).ready(function () {
    fetch()
})

function fetch() {
    $.ajax({
        url: "http://localhost:3000/poll/1/json",
        type: 'GET',
        success: function (res) {
            console.log(res);
            console.log("sucess");
        }
    });
}