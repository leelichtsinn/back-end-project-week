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

// GET /api/users:id
users.get('/:id', (req, res) => {
  const { id } = req.params;
  db('users').where('id', id).then(rows => {
    res.json(rows);
  })
  .catch(err => {
    res.status(500).json({ err: 'failed to find user' });
  });
});

module.exports = users;
