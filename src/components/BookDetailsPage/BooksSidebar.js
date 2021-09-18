/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import BooksSidebarStip from './BooksSidebarStip';

const BooksSidebar = ({ recentlyViewed }) => {
    const { books } = useSelector(state => state.books)
    const [similarBooks, setSimilarBooks] = useState([]);

    let { bookId } = useParams()

    useEffect(() => {
        const currentBook = books.find(book => book._id === bookId)
        setSimilarBooks(books.filter(book => (
            book.category === currentBook.category &&
            book._id !== bookId
        )).slice(0, 3))
    }, [bookId, books]);

    return (
        <div className="container-fluid mt-5 border-start bs-booksSidebar">
            <div className="row">
                <div className="col-12 col-md-6 col-lg-12 bs-bookSidebarStrip">
                    {/* Similar Books */}
                    <BooksSidebarStip title="Similar Books" books={similarBooks} />
                </div>
                <div className="col-12 col-md-6 col-lg-12">
                    {/* Recently Viewed Books */}
                    <BooksSidebarStip title="Recently Viewed" books={recentlyViewed.slice(0, 3)} />
                </div>
            </div>

        </div>
    );
}

export default BooksSidebar;
