var createList = require('./1_create_wishlist'),
       addItem = require('./2_add_to_wishlist'),
       getList = require('./3_get_wishlist'),
             Q = require('q');

var id;

createList().then(function (data) {
    id = data.id;
    return addItem(id, "A bike fast like the wind");
}).then(function () {
    return addItem(id, "An anti-slouching chair");
}).then(function () {
    return addItem(id, "An anti-slouching couch");
}).then(function () {
    return addItem(id, "A pair of flip flops I can walk miles with");
}).then(function () {
    return getList(id);
}).then(function (data) {
    console.log(data.wishlist);
});
