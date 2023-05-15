import React from 'react'
import { Link } from 'react-router-dom';


function AdminPage() {

  return (
    <div>
        <center>
        <Link to='/create-book'
              className='btn btn-outline-warning'>
            + Add New Book
        </Link>
        </center>
    </div>
  )
}

export default AdminPage
