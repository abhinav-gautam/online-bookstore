import React from 'react';
import LoadingSpinner from '../Helpers/LoadingSpinner';
import BookCard from './BookCard';

const FeaturedBooks = ({ title, books, isFeaturedBooksLoading }) => {
    const booksCount = books?.length
    return (
        <>

            <div className="display-5 mt-5">{title}</div>
            <div className="row row-cols-1 row-cols-sm-1 row-cols-md-3 row-cols-lg-3 row-cols-xl-4  ">
                {
                    isFeaturedBooksLoading &&
                    <LoadingSpinner message=" Loading Books..." />
                }
                {
                    booksCount >= 0
                    &&
                    books.map((book, index) => (
                        <BookCard book={book} key={index} />
                    ))
                }
            </div>
        </>
    );
}

export default FeaturedBooks;
