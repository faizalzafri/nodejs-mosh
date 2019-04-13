var url = 'http://somelogger.io/log';

function log(message){
    //send a http request
    console.log(message);
}

//module.exports.log = log;

module.exports = log;