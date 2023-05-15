import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../App.css';
import axios from 'axios';



function ShowBookDetails(props) {
  const [book, setBook] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/books/${id}`)
      .then((res) => {
        setBook(res.data);
      })
      .catch((err) => {
        console.log('Error from ShowBookDetails');
      });
  }, [id]);

  const onDeleteClick = (id) => {
    axios
      .delete(`http://localhost:8082/api/books/${id}`)
      .then((res) => {
        navigate('/');
      })
      .catch((err) => {
        console.log('Error form ShowBookDetails_deleteClick');
      });
  };

  const addBookToCart = (book) => {
    props.addBookToCart(book);
  };


  const showEdit = (
    props.isAdmin === true
    ? <div className='container'>
        <div className='row'>
        <div className='col-md-6 m-auto'>
        <button
          type='button'
          className='btn btn-outline-danger btn-lg btn-block'
          onClick={() => {
            onDeleteClick(book._id);
          }}
        >
          Delete Book
        </button>
      </div>
      <div className='col-md-6 m-auto'>
        <Link
          to={`/edit-book/${book._id}`}
          className='btn btn-outline-info btn-lg btn-block'
        >
          Edit Book
        </Link>
      </div>
    </div>
    </div>
    : void(0)
  )
  const getDate =(dateString) => {
    const d1 = new Date(dateString);
    return d1.getDay()+"/"+d1.getMonth()+"/"+d1.getFullYear();
  }

  const BookItem = (
    <div class="book-details-container">
  <div class="book-image-container">
    <img class="book-image" src={book.image_url} alt="Book Cover"/>
  </div>
  <div class="book-info-container">
    <h1 class="book-title">{ book.title }</h1>
    <hr/>
    <div class="book-info-row">
      <div class="book-info-label">ISBN:</div>
      <div class="book-info-value">{ book.isbn }</div>
    </div>
    <div class="book-info-row">
      <div class="book-info-label">Author:</div>
      <div class="book-info-value">{ book.author }</div>
    </div>
    <div class="book-info-row">
      <div class="book-info-label">Description:</div>
      <div class="book-info-value">{ book.description }</div>
    </div>
    <div class="book-info-row">
      <div class="book-info-label">Published Date:</div>
      <div class="book-info-value">{getDate(book.published_date) }</div>
    </div>
    <div class="book-info-row">
      <div class="book-info-label">Publisher:</div>
      <div class="book-info-value">{ book.publisher }</div>
    </div>
    <div class="book-info-row">
      <div class="book-info-label">Price:</div>
      <div class="book-info-value">{ book.price }</div>
    </div>
    <div class="book-info-row">
      <button className='btn btn-outline-warning'
      onClick={() => addBookToCart(book)}
      >Add to cart</button>
    </div>
  </div>

</div>

  );

  return (
    <div className='ShowBookDetails'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-10 m-auto'>
            <br /> <br />
            <Link to='/' className='btn btn-outline-warning float-left'>
              Show Book List
            </Link>
          </div>
          <br />
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Book's Record</h1>
            <p className='lead text-center'>View Book's Info</p>
            <hr /> <br />
          </div>
          <div className='col-md-10 m-auto'>{BookItem}</div>
          {showEdit}
          </div>
      </div>
    </div>
  );
}

export default ShowBookDetails;