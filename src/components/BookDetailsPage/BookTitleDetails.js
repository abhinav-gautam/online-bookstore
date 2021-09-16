import React from 'react';
import { Link } from 'react-router-dom';

const BookTitleDetails = ({ book, link }) => {
    return (
        <div>
            {
                link
                    ?
                    <p className="h3 fw-bold"><Link className="text-dark text-decoration-none" to={{ pathname: `/book/${book._id}`, state: { book } }}> {book.bookTitle}</Link></p>
                    :
                    <p className="h3 fw-bold"> {book.bookTitle}</p>
            }
            {
                book.tags && book.tags.split(",").map(tag => (
                    <>
                        {
                            tag === "newArrival"
                                ? <span className="badge rounded-pill bg-danger me-4">NEW ARRIVAL</span>
                                : <span className="badge rounded-pill bg-danger me-4">{tag.toUpperCase()}</span>
                        }
                    </>
                ))
            }
            <div className="d-flex mt-3">
                <div className="border-end pe-5">
                    <p><strong>Author:</strong> {book.author}</p>
                    <p><strong>Publisher:</strong> {book.publisher}</p>
                    <div>
                        {
                            book.discount ?
                                <>
                                    <span className="text-decoration-line-through">₹ {book.price}</span> <br />
                                    <span className="fs-3 fw-bold text-danger">₹ {Math.round(+book.price - +book.price * +book.discount / 100)}</span>
                                </>
                                :
                                <>
                                    <span className="fs-3 fw-bold text-danger">₹ {book.price}</span>
                                </>
                        }
                    </div>
                </div>
                <div className="ps-5">
                    <p><strong>Rating:</strong> {book.rating}</p>
                    <p><strong>Release Date:</strong> {book.releaseDate}</p>
                    <p><strong>Language:</strong> {book.language}</p>
                </div>
            </div>
        </div>
    );
}

export default BookTitleDetails;
