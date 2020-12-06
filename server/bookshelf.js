"use strict"

const knex = require('knex')(require('./knexFile'));
const bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;