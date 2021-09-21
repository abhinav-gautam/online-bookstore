import React from 'react';
import AboutBook from './AboutBook';
import AvailabilityDetails from './AvailabilityDetails';
import BookTitleDetails from './BookTitleDetails';

const BookDetails = ({ book }) => {
    return (
        <>
            <div className="mt-5 row">
                <div className="col-xxl-4 col-xl-6 col-lg-4 col-md-4 bd-bookImage">
                    <div className="position-relative">
                        <img src={book.bookImage} className="bd-bookImage" alt="" />
                        {
                            book.discount &&
                            <span className="position-absolute top-0 start-0 fs-6 translate-middle badge rounded-circle bg-danger p-2">
                                {book.discount}% <br /> off
                                <span className="visually-hidden">discount</span>
                            </span>
                        }
                    </div>
                </div>
                <div className="col-xxl-6 col-xl-6 col-lg-8 col-md-8">
                    <div className="ps-5 bd-bookTitleDetails">
                        <BookTitleDetails book={book} />
                    </div>
                    <div className="ps-5 mt-5 bd-availabilityDetails">
                        <AvailabilityDetails book={book} />
                    </div>
                </div>
            </div>
            <div>
                <AboutBook book={book} />
            </div>

        </>
    );
}

export default BookDetails;
