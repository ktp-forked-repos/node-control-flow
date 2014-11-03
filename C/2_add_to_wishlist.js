var http = require('http'),
    Q = require('q');

module.exports = function addItem(id, item) {
    var deferred = Q.defer();

    var reqOptions = {
        hostname: 'localhost',
        path: '/whishList/' + id,
        port: '8000',
        method: 'POST',
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
                deferred.resolve(JSON.parse(data));
            } catch (e) {
                deferred.reject(e);
            }
        });
    });

    req.on('error', function () {
        cb('error');
    });

    // End request
    req.write('{"item":"' + item + '"}');
    req.end();

    return deferred.promise;
};
