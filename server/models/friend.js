const bookshelf = require('../bookshelf');


const Friend = bookshelf.model('Friend', {
    tableName: 'friends',
    hasTimestamps: ['created_at', 'updated_at'],
        inventories: function () {
            return this.hasMany('Inventory');
        },
});

module.exports = Friend;
