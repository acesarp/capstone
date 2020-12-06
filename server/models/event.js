const bookshelf = require('../bookshelf');

const Event = bookshelf.model('Event', {
    tableName: 'events',
    hasTimestamps: ['created_at', 'updated_at'],
    eventOwner: () => {
        return this.belongsTo("User");
    },
    activities: () => {
        return this.hasMany('Activity');
    },
    participants: () => {
        return this.hasMany('Participant');
    }
});

module.exports = Event;
