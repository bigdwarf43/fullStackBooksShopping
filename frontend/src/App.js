import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import React, { useState, useEffect } from 'react';
import CreateBook from './components/CreateBook'
import ShowBookList from './components/ShowBookList'
import ShowBookDetails from './components/ShowBookDetails'
import UpdateBookInfo from './components/UpdateBookInfo'
import AdminPage from './components/AdminPage';
import logo from './ebookIcon.png'


function App() {

  const [isAdmin, setIsAdmin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [cartBooks, setCartBooks] = useState([]);



  const addBookToCart = (book) => {
    setCartBooks([...cartBooks, book]);
  };


  const Popup = ({ isOpen, onClose, children }) => {
    const handleClose = () => {
      onClose();
    };
  
    return (
      <>
        {isOpen && (
          <>
            <div className="overlay" onClick={handleClose}></div>
            <div className="popup">
              <button className="close-btn" onClick={handleClose}>
                X
              </button>
              {children}
            </div>
          </>
        )}
      </>
    );
  };

  const handleAdminBtnClicked = () => {
    if(isAdmin === true)
      setIsAdmin(false);
    else
      setIsAdmin(true);
  }

  const logOutOrAdminBtn =  
      isAdmin === false
      ?  <button
      className='btn btn-outline-warning'
      onClick={handleAdminBtnClicked}>
      Admin Mode
      </button>
      : <button
      className='btn btn-outline-warning'
      onClick={handleAdminBtnClicked}>
      Logout
      </button>
      

    const handleTogglePopup = () => {
      setIsOpen(!isOpen);
      };

    const showCart =  
      <div className="app">
      <Popup isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div className="cart">
                <div className="cart-header">
                  <h2>Your Cart</h2>
                 
                </div>
                {cartBooks.map((book) => (
                  <div key={book.id} className="cart-item">
                    <div className="book-info">
                      <h3>{book.title}</h3>
                      <p>{book.author}</p>
                    </div>
                    <div className="book-price">₹{book.price}</div>
                
                  </div>
                ))}
                <div className="cart-footer">
                  <div className="cart-total">
                    <span>Total:</span>
                    <span>₹{cartBooks.reduce((total, book) => total + book.price, 0)}</span>
                  </div>
                  <button className="checkout-btn">Checkout</button>
                </div>
              </div>
      </Popup>
    </div>
    
  return (
   <Router>
    <div>
    
  
       <div class="dark-header">
       
        <h1 class="dark-header-name">
        <img src={logo} className="dark-header-logo"/>  Buy Books.com</h1>
        <div class="dark-header-right">
          <button 
          className='btn btn-outline-warning'
          onClick={handleTogglePopup}>{isOpen ? 'Cart' : 'Cart'}</button>
          {logOutOrAdminBtn}
        </div>
      </div>
      
      <Routes>
        <Route exact path='/' element={<ShowBookList isAdmin= {isAdmin}/>}/>
        <Route path='/create-book' element={<CreateBook />}/>
        <Route path='/edit-book/:id' element={<UpdateBookInfo />}/>
        <Route path='/show-book/:id' element={<ShowBookDetails isAdmin= {isAdmin} addBookToCart = {addBookToCart}/>}/>
        <Route path='/admin-page' element={<AdminPage />}/>
      </Routes>

      {showCart}
      
    </div>
  </Router>
  );
  
}

export default App;
