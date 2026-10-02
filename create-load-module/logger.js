// Node wraps each module in (function (exports, require, module, __filename, __dirname) { ... }).
function log(message) {
    console.log(message);
}

module.exports = log;
