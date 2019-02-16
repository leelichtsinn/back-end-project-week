const express = require('express');
const db = require('../data/dbConfig');

const users = express.Router();

// GET /api/users
users.get('/', (req, res) => {
  db('users').then(rows => {
    res.json(rows);
  })
  .catch(err => {
    res.status(500).json({ err: 'failed to find users' });
  });
});

// GET /api/users/:id
users.get('/:id', (req, res) => {
  const { id } = req.params;
  db('users').where('id', id).then(rows => {
    res.json(rows);
  })
  .catch(err => {
    res.status(500).json({ err: 'failed to find user' });
  });
});

// GET /api/users/:id/notes
users.get('/:id/notes', (req, res) => {
  const { id } = req.params;
  db('users').where('id', id).then(user => {
    db('notes').where('user_id', id).then(notes => {
      res.json({
        id: user[0].id,
        name: user[0].username,
        notes: [notes]
      });
    });
  })
  .catch(err => {
    res.status(500).json({ err: 'failed to find user' });
  });
});

// POST /api/users
users.post('/', (req, res) => {
  const user = req.body;
  db('users').insert(user).then(userId => {
    db('users').get(userId.id).then(user => {
      res.status(201).json(userId);
    });
  })
  .catch(err => {
    res.status(500).json({ err: 'failed to insert user into db' });
  });
});

// PUT /api/users/:id
users.put('/:id', (req, res) => {
  const user = req.body;
  const { id } = req.params;
  db('users').where({ id }).update(user).then(count => {
    if (count) {
      db('users').get({ id }).then(user => {
        res.status(201).json(user);
      });
    } else {
      res.status(404).json({ message: 'the user with the specifed ID does not exist' });
    }
  })
  .catch(err => {
    res.status(500).json({ err: 'user information could not be modified' });
  });
});

// DELETE /api/cohorts/:id
users.delete('/:id', (req, res) => {
  const { id } = req.params;
  db('users').where({ id }).del().then(count => {
    if (count) {
      res.json({ message: 'successfully deleted' });
    } else {
      res.status(404).json({ message: 'the user with the specifed ID does not exist' });
    }
  })
  .catch(err => {
    res.status(500).json({ err: 'the user could not be removed' });
  });
});

module.exports = users;
