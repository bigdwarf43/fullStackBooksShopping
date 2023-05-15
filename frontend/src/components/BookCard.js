import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const BookCard = (props) => {
  const book = props.book;
  
  return (
    <div className='card-container'>
      <center>
      <img
        src= {book.image_url}
        alt='Books'
        height={200}
      />
      </center>
      
      <div className='desc'>
        <center>
        <h2>
          <Link to={`/show-book/${book._id}`}>{book.title}</Link>
        </h2>
        <h3>{book.author}</h3>
        <p>₹{book.price}</p>
        </center>
  
      </div>
    </div>
  );
};

export default BookCard;