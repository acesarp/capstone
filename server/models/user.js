const bookshelf = require('../bookshelf');


const User = bookshelf.model('User', {
    tableName: 'Users',
    hasTimestamps: ['created_at', 'updated_at'],
    friends: function () {
        return this.belongsToMany("User");
    },
    events: function () {
        return this.belongsToMany("Event");
    }
});

module.exports = User;
