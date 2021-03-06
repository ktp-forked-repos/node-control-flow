var   thunkify = require('thunkify')
    createList = thunkify(require('../B/1_create_wishlist')),
       addItem = thunkify(require('../B/2_add_to_wishlist')),
       getList = thunkify(require('../B/3_get_wishlist')),
            co = require('co');

co(function *(){
    var data = yield createList();

    yield [
        addItem(data.id, "A bike which works against the wind"),
        addItem(data.id, "An anti-slouching chair"),
        addItem(data.id, "An anti-slouching couch"),
        addItem(data.id, "A pair of flip flops I can walk miles with")
    ];

    var list = yield getList(data.id);
    console.log(list.wishlist);
})();
