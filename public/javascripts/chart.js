$(document).ready(function () {
    var url = window.location.href
    var index = url.lastIndexOf("/");
    var pollID = url.substr(index)
    createChart(pollID)
})

//create chart with info from db
function createChart(pollID) {
    const local = 'http://localhost:3000/'
    const deploy = 'https://anonvote.herokuapp.com/'

    var config = {
        type: 'pie',
        data: {
            datasets: [{
                data: [],
                backgroundColor: [],
                label: 'Dataset 1'
            }],
            labels: []
        },
        options: {
            responsive: true,
        }
    };

    //fetch the info
    $.ajax({
        url: local + "api/vote/info" + pollID,
        type: 'GET',
        success: function (res) {
            //console.log(res);
           // console.log(res.voteInfo);
           // console.log(res.voteInfo[0].tally);
           // console.log(config.data.datasets.data)
            config.data.datasets[0].data = []
            config.data.labels = []
            for (i = 0; i<res.voteInfo.length; i++) {
                config.data.datasets[0].data.push(res.voteInfo[i].tally);
                config.data.datasets[0].backgroundColor.push(randomColor());
                config.data.labels.push(res.voteInfo[i].option);
            }
            var ctx = document.getElementById("chart-area").getContext("2d");
            var myPie = new Chart(ctx, config);
        }
    });
}

window.chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};

var dynamicColors = function() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
 };

var randomScalingFactor = function () {
    return Math.round(Math.random() * 100);
};