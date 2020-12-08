const bookshelf = require('../bookshelf');

const Comment = bookshelf.model('Comment', {
    tableName: 'reactions',
    hasTimestamps: ['created_at', 'updated_at'],
    owner: function () {
        return this.belongsTo("User")
    },
    reactions: function () {
        return this.hasMany("Reaction");
    }
});

module.exports = Comment;
