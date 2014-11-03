var createList = require('./1_create_wishlist'),
       addItem = require('./2_add_to_wishlist'),
       getList = require('./3_get_wishlist');

createList(function (err, data) {
    var id = data.id;
    addItem(id, "A bike fast like the wind", function (err, data) {
        addItem(id, "An anti-slouching chair", function (err, data) {
            addItem(id, "An anti-slouching couch", function (err, data) {
                addItem(id, "A pair of flip flops I can walk miles with", function (err, data) {
                    getList(id, function (err, data) {
                        console.log(data.wishlist);
                    });
                });
            });
        });
    });
});
