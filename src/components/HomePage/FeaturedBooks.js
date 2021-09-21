import React from 'react';
import { useHistory } from 'react-router';
import LoadingSpinner from '../Helpers/LoadingSpinner';
import BookCard from './BookCard';

const FeaturedBooks = ({ title, books, isBooksLoading, feature }) => {
    const booksCount = books?.length
    const history = useHistory()
    return (
        <>

            <div className="display-5 mt-5 cursor-pointer" onClick={() => history.push({ pathname: `/featured/${feature}`, state: { title } })}>{title}</div>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4  ">
                {
                    isBooksLoading &&
                    <LoadingSpinner message=" Loading Books..." />
                }
                {
                    booksCount >= 0
                    &&
                    books.filter(book => book.tags?.includes(feature)).slice(0, 4).map(book => (
                        <BookCard book={book} key={book._id} />
                    ))
                }
            </div>
        </>
    );
}

export default FeaturedBooks;
