var fs = require('fs')
var util = require('util')
var moment = require('moment')

function log(d) { //
    var log_file = fs.createWriteStream(__dirname + '/'+ moment().tz("America/Sao_Paulo").format() +'.log', {flags : 'w'})
    var log_stdout = process.stdout
    log_file.write(util.format(d) + '\n')
    log_stdout.write(util.format(d) + '\n')
}

module.exports = {
    log
}