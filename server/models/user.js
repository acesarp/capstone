
const bookshelf = require('../bookshelf');

const User = bookshelf.model('User', {
    tableName: 'users',
    hasTimestamps: ['created_at', 'updated_at'],
    profile: function() {
        return this.hasOne('Profile');
    }
    
});

module.exports = User;
