
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {id: 1, title: 'testing', textBody: 'This is some testing text', user_id: 2 },
        {id: 2, title: 'testing', textBody: 'Been testing some notes', user_id: 2 },
        {id: 3, title: 'testing', textBody: 'This is a test', user_id: 3 },
        {id: 4, title: 'testing', textBody: 'Note for testing purposes', user_id: 2 },
        {id: 5, title: 'testing', textBody: 'rowValue1', user_id: 4 },
        {id: 6, title: 'testing', textBody: 'Note for testing purposes', user_id: 4 },
        {id: 7, title: 'testing', textBody: 'rowValue1', user_id: 3 },
        {id: 8, title: 'testing', textBody: 'This is a test', user_id: 2 },
        {id: 9, title: 'testing', textBody: 'Note for testing purposes', user_id: 2 },
      ]);
    });
};
