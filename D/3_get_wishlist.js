var http = require('http');

function getList(id, cb) {
    var reqOptions = {
        hostname: 'localhost',
        path: '/whishList/' + id,
        port: '8000',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
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

module.exports = function (id) {
    return function (cb) {
        getList(id, cb);
    };
};

module.exports = function (id) {
    getList(id, cb);
    return function (cb) {
        getList(id, cb);
    };
};
