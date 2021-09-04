import React from 'react';

const BookTile = ({ book }) => {
    return (
        <>
            <div className="mt-5 row">
                <div className="col-xl-2 col-lg-4">
                    <img src={book.bookImage} alt="" width="200px" height="300px" />

                </div>
                <div className="col-xl-5 border-end pe-5">
                    <div className="ms-4 mt-5">
                        <p className="h3 fw-bold ">{book.bookTitle}</p>
                        <div className="d-flex mt-3">
                            <div className="border-end pe-5">
                                <p><strong>Author:</strong> {book.author}</p>
                                <p><strong>Publisher:</strong> {book.publisher}</p>
                                <div>
                                    <span className="text-decoration-line-through">₹ {book.price * .20 + book.price}</span> <br />
                                    <span className="fs-3 fw-bold text-danger">₹ {book.price}</span>
                                </div>
                            </div>
                            <div className="ps-5">
                                <p><strong>Rating:</strong> {book.rating}</p>
                                <p><strong>Release Date:</strong> {book.releaseDate}</p>
                                <p><strong>Language:</strong> English</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-5 ps-5">
                    <div className="mt-5">
                        <p className="text-success fs-3 fw-bold">Available</p>
                        <p>Ships within <strong>4-6 Days</strong></p>
                        <p>Shipping Charge: ₹ 40</p>
                        <button className="btn btn-danger">Buy Now</button>
                        <button className="btn btn-secondary ms-4">Add to Wishlist</button>
                    </div>
                </div>

            </div>
            <hr width="75%" className="mx-auto mt-5" />
        </>
    );
}

export default BookTile;
