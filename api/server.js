const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const cors = require('cors');
const knex = require('knex');

const usersRoute = require('../routes/users');
const notesRoute = require('../routes/notes');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(logger('dev'));
server.use(cors());

// routes
server.use('/api/users', usersRoute);
server.use('/api/notes', notesRoute);

server.get('/', async (req, res) => {
  res.status(200).json({ api: 'up and running' })
});

module.exports = server;
