var http = require('http'),
    Q = require('q');

module.exports = function createList() {
    var deferred = Q.defer();

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
                deferred.resolve(JSON.parse(data));
            } catch (e) {
                deferred.reject(e);
            }
        });
    });

    req.on('error', function () {
        deferred.reject('error');
    });

    // End request
    req.end();

    return deferred.promise;
};
