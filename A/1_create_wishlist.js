var http = require('http');

var reqOptions = {
    hostname: 'localhost',
    path: '/whishList',
    port: '8000',
    method: 'POST'
};

var req = http.request(reqOptions, function (res) {
    // Echo status code
    console.log(res.statusCode);

    // Data length
    var data = '';

    // Listen for data
    res.on('data', function (chunk) {
        data += chunk.toString();
    });

    // Listen for end
    res.on('end', function () {
        console.log(data);
    });

    console.log('Data: ');
});
// End request
req.end();

console.log('Request with statusCode: ');
