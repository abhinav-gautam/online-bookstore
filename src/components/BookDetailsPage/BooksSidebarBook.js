import React from 'react';
import { useHistory } from 'react-router';

const BooksSidebarBook = ({ book }) => {
    const history = useHistory()

    return (
        <div className="d-flex mt-5 cursor-pointer" onClick={() => history.push({ pathname: `/book/${book._id}`, state: { book } })}>
            <div className="position-relative">
                <img src={book.bookImage} alt="" width="150px" />
                <span class="position-absolute top-0 start-0 translate-middle badge rounded-circle bg-danger p-2">
                    20% <br /> off
                    <span class="visually-hidden">discount</span>
                </span>
            </div>
            <div className="ps-4 d-flex flex-column">
                <p className="fw-bold">
                    {
                        book.bookTitle.split(" ").length > 5
                            ? book.bookTitle.split(" ").slice(0, 5).join(" ") + " ..."
                            : book.bookTitle
                    }
                </p>
                <small>By: {book.author}</small>
                <small className="mt-4 text-decoration-line-through">₹ {book.price * .20 + book.price}</small>
                <span className="fs-5 fw-bold text-danger">₹ {book.price}</span>
            </div>
        </div >
    );
}

export default BooksSidebarBook;
