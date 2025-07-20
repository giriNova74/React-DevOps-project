const mongoose = require('mongoose');
require('dotenv').config();

// Book schema (same as in server.js)
const Book = mongoose.model('Book', {
  title: String,
  author: String,
  reviews: [{ user: String, text: String }]
});

// Sample data
const books = [
  {
    title: 'The DevOps Handbook',
    author: 'Gene Kim',
    reviews: []
  },
  {
    title: 'Clean Code',
    author: 'Robert C. Martin',
    reviews: []
  },
  {
    title: 'Site Reliability Engineering',
    author: 'Betsy Beyer',
    reviews: []
  }
];

// Connect and insert
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  await Book.deleteMany();          // Clear existing
  await Book.insertMany(books);     // Insert new
  console.log('📚 Sample books inserted');
  process.exit();
})
.catch(err => console.error(err));
