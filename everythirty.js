var exec = require('child_process').exec

var unit = 30 * 60;

function cur_time(c) {
    exec('date +%s',
        function (error, stdout) {
            c(stdout.trim());
        })
}

function speak_time(time, c) {
    exec('date -d @'+time+' +\'%l, %M\'',
        function (error, stdout) {
            console.log(stdout.trim())
            exec('espeak "'+stdout+'"', c)
        })
}

function schedule() {
    cur_time(function (time) {
        var rounded = Math.ceil(time / unit) * unit
        setTimeout(speak_time,
            1000 * (rounded - time),
            rounded,
            schedule)
    })
}

cur_time(speak_time)
schedule()
