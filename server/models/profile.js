const bookshelf = require('../bookshelf');


const Profile = bookshelf.model('Profile', {
    tableName: 'profiles',
    hasTimestamps: ['created_at', 'updated_at'],
    user: function() {
        return this.belongsTo("User");
    },
    friends: function () {
        return this.hasMany("Friend");
    },
    events: function () {
        return this.hasMany("Event");
    }
});

module.exports = Profile;
