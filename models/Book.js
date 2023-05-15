const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    isbn: {
        type: String,
        required: true
      },

    author: {
        type: String,
        required: true
      },

    description: {
        type: String
      },

    published_date: {
        type: Date
      },

    publisher: {
        type: String
      },

    updated_date: {
        type: Date,
        default: Date.now
      },
    price: {
        type: Number
      },
    image_url: {
        type: String,
        default: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d"
      }
});

module.exports = Book = mongoose.model('book', BookSchema);