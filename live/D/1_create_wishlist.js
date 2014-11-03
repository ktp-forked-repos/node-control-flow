var http = require('http');

function createList(cb) {
    var reqOptions = {
        hostname: 'localhost',
        path: '/whishList',
        port: '8000',
        method: 'POST'
    };

    var req = http.request(reqOptions, function (res) {
        // Data length
        var data = '';

        // Listen for data
        res.on('data', function (chunk) {
            data += chunk.toString();
        });

        // Listen for end
        res.on('end', function () {
            try {
                cb(undefined, JSON.parse(data));
            } catch (e) {
                cb(e);
            }
        });
    });

    req.on('error', function () {
        cb('error');
    });

    // End request
    req.end();
};

module.exports = function () {
    return function (cb) {
        createList(cb);
    };
};
