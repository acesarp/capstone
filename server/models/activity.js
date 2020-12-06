const bookshelf = require('../bookshelf');

const Activity = bookshelf.model('Activity', {
    tableName: 'activities',
    hasTimestamps: ['created_at', 'updated_at'],
    inventories: function () {
        return this.hasMany('Inventory');
    },
});

module.exports = Activity;
