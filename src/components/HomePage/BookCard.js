import React from 'react';
import { useHistory } from 'react-router';

const BookCard = ({ book }) => {
    const history = useHistory()
    return (
        <div className="col d-flex align-items-stretch" key={book._id} >
            <div className="card mt-5 shadow w-75 cursor-pointer" onClick={() => history.push({ pathname: `/book/${book._id}`, state: { book } })}>
                <span class="position-absolute top-0 start-0 translate-middle badge rounded-circle bg-danger p-2">
                    20% <br /> off
                    <span class="visually-hidden">discount</span>
                </span>
                <div className="card-body w-100">
                    <img src={book.bookImage} alt="" width="100%" />
                    <p className="h4 text-center mt-3">₹ {book.price}</p>
                    <p className="h5 fw-bold">{book.bookTitle}</p>
                    <p className="small">{book.author}</p>
                    {
                        // user.username &&
                        // <button className="btn btn-primary mt-3" onClick={handleAddToCart}>Add To Cart <FontAwesomeIcon icon={faCartPlus} /></button>
                    }
                </div>
            </div>
        </div >
    );
}

export default BookCard;
