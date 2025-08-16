const MyBook = require("../models/myBookModel"); // user-book relation model
const Book = require("../models/bookModel");     // main books collection


// POST /api/mybooks/:bookId – Add book to user's list
let addMyBook = async (req, res) => {
  try {
    const { bookId } = req.params;

    // Prevent duplicate entry
    const existing = await MyBook.findOne({ userId: req.user.id, bookId: bookId });
    if (existing) return res.status(400).json({ message: "Book already in your list" });

    const myBook = new MyBook({
      userId: req.user.id,
      bookId: bookId,
      status: "Want to Read", // default status
      rating: null
    });

    await myBook.save();
    res.status(201).json(myBook);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/mybooks – Fetch user’s books
let getMyBooks = async (req, res) => {
  try {
    // Force convert userId to ObjectId
    const myBooks = await MyBook.find({
      userId: req.user.id
    }).populate(
      "bookId");

    if (myBooks.length === 0) {
      return res.status(404).send({ message: "No books" });
    }

    res.json(myBooks);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};




// PATCH /api/mybooks/:bookId/status – Update reading status
let updateStatus = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { status } = req.body; // "Want to Read" | "Currently Reading" | "Read"

    if (!["Want to Read", "Currently Reading", "Read"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updated = await MyBook.findOneAndUpdate(
      { userId: req.user.id, bookId: bookId },
      { status },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Book not found in your list" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error" ,error: err.message});
  }
};

// PATCH /api/mybooks/:bookId/rating – Update rating
let updateRating = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { rating } = req.body; // number 1-5

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    const updated = await MyBook.findOneAndUpdate(
      { userId: req.user.id, bookId: bookId },
      { rating },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Book not found in your list" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getMyBooks, addMyBook, updateStatus, updateRating }