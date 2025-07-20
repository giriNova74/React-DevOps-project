const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Book Schema
const Book = mongoose.model('Book', {
  title: String,
  author: String,
  reviews: [{ user: String, text: String }]
});

// Get all books
app.get('/books', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// Submit a review
app.post('/reviews', async (req, res) => {
  const { bookId, user, text } = req.body;
  const book = await Book.findById(bookId);
  book.reviews.push({ user, text });
  await book.save();
  res.json(book);
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(5000, () => console.log('Server started on port 5000')))
  .catch((err) => console.log(err));
