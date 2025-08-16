const Book = require('../models/bookModel');

// @desc    Get all books
// @route   GET /api/books
// @access  Public
let getBooks = async (req, res) => {
  try {
    const books = await Book.find();  // fetch all books
    if(!books) return res.status(404).send({ message: 'Books not found' })
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
module.exports={getBooks}