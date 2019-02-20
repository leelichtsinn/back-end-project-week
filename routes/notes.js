const express = require('express');
const db = require('../data/dbConfig');

const notes = express.Router();

// GET /api/notes
notes.get('/', (req, res) => {
  db('notes').then(rows => {
    res.json(rows);
  })
  .catch(err => {
    res.status(500).json({ err: 'faild to find notes' });
  });
});

// Get /api/notes/:id
notes.get('/:id', (req, res) => {
  const { id } = req.params;
  db('notes').where('id', id).then(rows => {
    res.json(rows);
  })
  .catch(err => {
    res.status(500).json({ err: 'failed to find note' });
  });
});

// POST /api/notes
notes.post('/', (req, res) => {
  const note = req.body;
  db('notes').insert(note).then(noteId => {
    db('notes').get(noteId.id).then(note => {
      res.status(201).json(noteId);
    });
  })
  .catch(err => {
    res.status(500).json({ err: 'failed to insert note into db' });
  });
});

// PUT /api/notes/:id
notes.put('/:id', (req, res) => {
  const note = req.body;
  const { id } = req.params;
  db('notes').where('id', id).update(note).then(count => {
    if (count) {
      db('notes').get({ id }).then(note => {
        res.status(201).json(note.id);
      });
    } else {
      res.status(404).json({ message: 'the note with the specified ID does not exist' });
    }
  })
  .catch(err => {
    res.status(500).json({ err: 'note information could not be modified' });
  });
});

// DELETE /api/notes/:id
notes.delete('/:id', (req, res) => {
  const { id } = req.params;
  db('notes').where('id', id).del().then(count => {
    if (count) {
      res.json({ message: 'successfully deleted' });
    } else {
      res.status(404).json({ message: 'the note with the specified ID does not exist' });
    }
  })
  .catch(err => {
    res.status(500).json({ err: 'the note could not be removed' });
  });
});

module.exports = notes;
