const bookshelf = require('../bookshelf');


const Participant = bookshelf.model('Participant', {
    tableName: 'participants',
    hasTimestamps: ['created_at', 'updated_at'],
    friends: function () {
        return this.hasMany('events', 'eventId', 'eventId');
    }
});

module.exports = Participant;
