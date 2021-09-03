import React from 'react';

const BookCard = ({ book }) => {
    return (
        <div className="col d-flex align-items-stretch" key={book._id}>
            <div className="card mt-5 shadow w-75">
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
