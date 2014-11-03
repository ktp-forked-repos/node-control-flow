// Create a server (no framework used)
var http = require('http');

var wishLists = {'000000000000': []};

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
    console.log(wishLists);
    // Add a new whishlist
    if (request.url === '/whishList' && request.method === 'POST') {
        // Create token
        var token = generateToken();
        // Create new wish list
        wishLists[token] = [];
        // Write response
        ok(response, {id: token});
        return;
    }

    if (/^\/whishList\/([0-9a-z]{12})$/.test(request.url)) {
        var id = request.url.match(/^\/whishList\/([0-9a-z]{12})$/)[1];

        // Get a whishlist
        if (request.method === 'GET') {
            if (!wishLists.hasOwnProperty(id)) {
                notFound(response);
                return;
            }

            ok(response, {wishlist: wishLists[id]});
            return;
        }

        if (request.method === 'POST') {
            var data = '';

            request.on('data', function (chunk) {
              data += chunk.toString();
            });

            request.on('end', function () {
                try {
                    data = JSON.parse(data);

                    if (!data.item) {
                        badRequest(response, "Missing item");
                    } else if (wishLists[id].indexOf(data.item) !== -1) {
                        badRequest(response, "Item already in list");
                    } else {
                        wishLists[id].push(data.item);
                        ok(response, {});
                    }
                } catch (e) {
                    badRequest(response, "Couldn't parse JSON");
                }
            });

            request.on('error', function () {
                badRequest(response, "Error reading data");
            });

            return;
        }
    }

    notFound(response);
});

// Listen on port 8000
server.listen(8000);
console.log("Wish list server running at http://127.0.0.1:8000/");

// Responses
function notFound(response) {
    response.writeHead(404, {"Content-Type": "application/json"});
    response.end(JSON.stringify({error: "Not found"}));
}

function badRequest(response, msg) {
    response.writeHead(400, {"Content-Type": "application/json"});
    response.end(JSON.stringify({error: msg || "Bad request"}));
}

function ok(response, data) {
    // Write response
    response.writeHead(200, {"Content-Type": "application/json"});
    response.end(JSON.stringify(data));
}

// Generate token function
function generateToken() {
    var chars = '0123456789abcdefghiklmnopqrstuvwxyz'.split('');

    var str = '';
    for (var i = 0; i < 12; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}
