
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Comments').del()
    .then(function () {
      // Inserts seed entries
      return knex('Comments').insert([
        { Title: 'Comments', Text: "Bad...", OwnerId: 2,  },
        { Title: "Great!", Text: 'rowValue 3', OwnerId: 3,},
        { Title: "Good.", Text: 'rowValue 4', OwnerId: 4,}
      ]);
    });
};
