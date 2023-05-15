import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BookCard from './BookCard';

function ShowBookList(props) {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:8082/api/books')
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        console.log('Error from ShowBookList');
      });
  }, []);


  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBooks = books.filter((book) => {
    return book.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const bookList =
    books.length === 0
      ? 'there is no book record!'
      : filteredBooks.map((book, k) => (
        <BookCard book={book} key={k} />
      )) 
      // books.map((book, k) => <BookCard book={book} key={k} />);
  
  const createBookBtn =
        props.isAdmin === true
        ?  <Link
        to='/create-book'
        className='btn btn-outline-warning float-left'>
        + Add New Book
        </Link>
        : void(0)

  return (
    <div className='ShowBookList'>
        
      <div className='container'>
        
        <div className='row'>
          <div className='col-md-11'>

            {createBookBtn}
            <br />
            <br />
            <div class="search-bar">
            <input type="text" 
                  class="search-input" 
                  placeholder="Search..."
                  value={searchTerm} 
                  onChange={handleSearchInputChange}/>
          </div>

            <hr />
          </div>
        </div>

        <div className='list'>{bookList}</div>
      </div>
    </div>
  );
}

export default ShowBookList;