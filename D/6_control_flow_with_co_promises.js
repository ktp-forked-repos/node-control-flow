var createList = require('../C/1_create_wishlist'),
       addItem = require('../C/2_add_to_wishlist'),
       getList = require('../C/3_get_wishlist'),
            co = require('co');

co(function *(){
    var data = yield createList();

    yield [
        addItem(data.id, "A bike fast like the wind"),
        addItem(data.id, "An anti-slouching chair"),
        addItem(data.id, "An anti-slouching couch"),
        addItem(data.id, "A pair of flip flops I can walk miles with")
    ];

    var list = yield getList(data.id);
    console.log(list.wishlist);
})();
