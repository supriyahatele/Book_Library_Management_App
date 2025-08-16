const express = require('express');
const { getMyBooks, addMyBook, updateStatus, updateRating } = require('../controllers/mybookController');
const { authMiddleware } = require('../middlewares/auth');
const myBooksRouter = express.Router();

myBooksRouter.get('/mybooks', authMiddleware, getMyBooks );
myBooksRouter.post('/mybooks/:bookId',authMiddleware, addMyBook);
myBooksRouter.patch('/mybooks/:bookId/status',authMiddleware, updateStatus);
myBooksRouter.patch('/mybooks/:bookId/rating',authMiddleware, updateRating);

module.exports = myBooksRouter;
