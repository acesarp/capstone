const bookshelf = require('../bookshelf');

const Activity = bookshelf.model('Activity', {
    tableName: 'activities',
    hasTimestamps: ['created_at', 'updated_at'],
    event: function () {
        return this.belongsTo('Event');
    },
});

module.exports = Activity;
