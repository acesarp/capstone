'use strict';

const bookshelf = require('../bookshelf');
const Profile = require('./profile');

const User = bookshelf.model('User', {
    tableName: 'users',
    hasTimestamps: ['created_at', 'updated_at'],
    profiles: function() {
        return this.hasOne(Profile);
    }
    
});

module.exports = User;
