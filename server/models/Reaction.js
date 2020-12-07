const bookshelf = require('../bookshelf');

const Reaction = bookshelf.model('Profile', {
    tableName: 'reactions',
    hasTimestamps: ['created_at', 'updated_at'],
    comment: function () {
        return this.belongsTo("Comment");
    }
});

module.exports = Reaction;
