const bookshelf = require('../bookshelf');

const Event = bookshelf.model('Event', {
    tableName: 'events',
    hasTimestamps: ['created_at', 'updated_at'],
    eventOwner: () => {
        return this.belongsTo("Profile");
    },
    activities: () => {
        return this.hasMany('Activity');
    },
    participants: () => {
        return this.belongsToMany('Profile');
    }
});

module.exports = Event;
