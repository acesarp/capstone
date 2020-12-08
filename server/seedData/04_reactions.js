
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Reactions').del()
    .then(function () {
      // Inserts seed entries
      return knex('Reactions').insert([
        {likeDislike: 1, ownerId: 2},
        { likeDislike: 1, ownerId: 1},
        { likeDislike: 0, ownerId: 3}
      ]);
    });
};
