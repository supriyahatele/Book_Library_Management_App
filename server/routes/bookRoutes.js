const express = require('express');
const bookRouter = express.Router();
const { getBooks } = require('../controllers/bookController');

// Public route - get all books
bookRouter.get('/books', getBooks);

module.exports = bookRouter;
