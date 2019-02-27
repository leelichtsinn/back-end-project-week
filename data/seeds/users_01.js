
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'lee', password: '2468'},
        {id: 2, username: 'troy', password: '2468'},
        {id: 3, username: 'asako', password: '2468'}
      ]);
    });
};
