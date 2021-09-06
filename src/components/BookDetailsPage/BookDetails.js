import React from 'react';

const BookDetails = ({ book }) => {
    return (
        <>
            <div className="mt-5 row">
                <div className="col-xl-4 col-lg-4">
                    <div className="position-relative">
                        <img src={book.bookImage} alt="" width="400px" height="500px" />
                        <span class="position-absolute top-0 start-0 fs-6 translate-middle badge rounded-circle bg-danger p-2">
                            20% <br /> off
                            <span class="visually-hidden">discount</span>
                        </span>
                    </div>
                </div>
                <div className="col-xl-7 pe-5">
                    <div className="ps-5 mt-5">
                        <p className="h3 fw-bold"> {book.bookTitle}</p>
                        {
                            book.tags && book.tags.split(",").map(tag => (
                                <>
                                    {
                                        tag === "newArrival"
                                            ? <span class="badge rounded-pill bg-danger me-4">NEW ARRIVAL</span>
                                            : <span class="badge rounded-pill bg-danger me-4">{tag.toUpperCase()}</span>
                                    }
                                </>
                            ))
                        }
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
                    <div className="ps-5">
                        <div className="mt-5">
                            <p className="text-success fs-3 fw-bold">Available</p>
                            <p>Ships within <strong>4-6 Days</strong></p>
                            <p>Shipping Charge: ₹ 40</p>
                            <button className="btn btn-danger">Buy Now</button>
                            <button className="btn btn-secondary ms-4">Add to Wishlist</button>
                        </div>
                    </div>
                </div>

            </div>
            <div className="display-6 mt-5">About the Book</div>
            <p className="lead mt-2">{book.description}</p>
            <hr className="mt-5" />
            <div className="display-6 mt-5">Book Details</div>
            <div className="d-flex lh-lg">
                <div className="mt-2">
                    <div className="lead fw-bold">ISBN:</div>
                    <div className="lead fw-bold">Publisher:</div>
                    <div className="lead fw-bold">Release Date:</div>
                    <div className="lead fw-bold">Height:</div>
                    <div className="lead fw-bold">Weight:</div>
                </div>
                <div className="mt-2 ms-5 me-5">
                    <div className="lead">{book.isbn}</div>
                    <div className="lead">{book.publisher}</div>
                    <div className="lead">{book.releaseDate}</div>
                    <div className="lead">223 mm</div>
                    <div className="lead">481 gm</div>
                </div>
                <div className="mt-2">
                    <div className="lead fw-bold">Width:</div>
                    <div className="lead fw-bold">No of Pages:</div>
                    <div className="lead fw-bold">Language:</div>
                    <div className="lead fw-bold">Binding:</div>
                    <div className="lead fw-bold">Returnable:</div>
                </div>
                <div className="mt-2 ms-5">
                    <div className="lead">161 mm</div>
                    <div className="lead">322</div>
                    <div className="lead">English</div>
                    <div className="lead">Hardback</div>
                    <div className="lead">No</div>
                </div>
            </div>

        </>
    );
}

export default BookDetails;
