import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AvailabilityDetails from '../BookDetailsPage/AvailabilityDetails';
import BookImage from '../BookDetailsPage/BookImage';
import BookTitleDetails from '../BookDetailsPage/BookTitleDetails';

const BookTile = ({ book }) => {
    const { isAuth, user } = useSelector(state => state.user)
    return (
        <>
            <div className="mt-5 row">
                <div className="col-xl-3 col-lg-4 col-md-4 col-sm-4">
                    <Link to={{ pathname: `/book/${book._id}`, state: { book } }}>
                        <BookImage book={book} width="200px" height="300px" />
                    </Link>
                </div>
                <div className={isAuth && user.status === "active"
                    ? "col-xl-5 col-lg-8 col-md-7 col-sm-7 cp-bookTitleDetail border-end pe-5"
                    : "col-xl-5 col-lg-8 col-md-7 col-sm-7 cp-bookTitleDetail pe-5"}>
                    <div className="ms-4 mt-3">
                        <BookTitleDetails book={book} link={true} />
                    </div>
                </div>
                {
                    isAuth && user.status === "active" &&
                    <div className="col-xl-4 ps-5 cp-availabilityDetails">
                        <AvailabilityDetails book={book} />
                    </div>
                }

            </div>
            <hr width="75%" className="mx-auto mt-5" />
        </>
    );
}

export default BookTile;
