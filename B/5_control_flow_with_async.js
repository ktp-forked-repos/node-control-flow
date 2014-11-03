var createList = require('./1_create_wishlist'),
       addItem = require('./2_add_to_wishlist'),
       getList = require('./3_get_wishlist'),
         async = require('async');

var id;

async.waterfall([
    function (next) {
        createList(next);
    },
    function (data, next) {
        id = data.id;
        async.parallel([
            function (cb) {
                addItem(id, "A bike fast like the wind", cb);
            },
            function (cb) {
                addItem(id, "An anti-slouching chair", cb);
            },
            function (cb) {
                addItem(id, "An anti-slouching couch", cb);
            },
            function (cb) {
                addItem(id, "A pair of flip flops I can walk miles with", cb);
            }
        ], next);
    },
    function (data, next) {
        // console.log(arguments);
        getList(id, next);
    }
], function (err, data) {
    console.log(data.wishlist);
});
