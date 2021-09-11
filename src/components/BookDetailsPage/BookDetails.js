import React from 'react';
import { useSelector } from 'react-redux';
import AboutBook from './AboutBook';
import AvailabilityDetails from './AvailabilityDetails';
import BookImage from './BookImage';
import BookTitleDetails from './BookTitleDetails';

const BookDetails = ({ book }) => {
    const { isAuth } = useSelector(state => state.user)

    return (
        <>
            <div className="mt-5 row">
                <div className="col-xl-4 col-lg-4">
                    <BookImage book={book} width="400px" height="500px" />
                </div>
                <div className="col-xl-7 pe-5">
                    <div className="ps-5 mt-5">
                        <BookTitleDetails book={book} />
                    </div>
                    <div className="ps-5 mt-5">
                        {
                            isAuth &&
                            <AvailabilityDetails book={book} />
                        }
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
