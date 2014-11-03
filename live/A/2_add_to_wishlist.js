var http = require('http');

var reqOptions = {
    hostname: 'localhost',
    path: '/whishList/000000000000',
    port: '8000',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
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
req.write('{"item":"Flip flops I can walk with"}');
req.end();

console.log('Request with statusCode: ');
