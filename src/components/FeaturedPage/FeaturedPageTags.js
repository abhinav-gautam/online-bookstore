/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import BookTile from '../CategoryPage/BookTile';
import LoadingSpinner from '../Helpers/LoadingSpinner';
import CategorySidebar from '../HomePage/CategorySidebar';
import Footer from '../HomePage/Footer';

const FeaturedPageTags = () => {
    const { feature } = useParams()
    const { title } = useLocation().state

    const { books, isBooksLoading } = useSelector(state => state.books)
    const [filteredBooks, setFilteredBooks] = useState([]);

    // Filtering books based on category
    useEffect(() => {
        setFilteredBooks(books.filter(book => book.tags.includes(feature)))
    }, [feature, books]);

    return (
        <>
            <div className="container-fluid">
                <div className="row">

                    {/* Categories Sidebar */}
                    <div className="col-md-3 col-xl-2">
                        <CategorySidebar />
                    </div>

                    {/* Main Content */}
                    <div className="col-md-9 col-xl-10 border-start mt-4 mb-5">
                        <div className="container-fluid">
                            <div className="display-5 mt-5 text-center">{title}</div>
                            <div className="mt-3">{filteredBooks.length} books found</div>
                            {
                                isBooksLoading && <div className="mt-5"><LoadingSpinner message=" Loading Books..." /></div>
                            }
                            {
                                filteredBooks.map(book => (
                                    <BookTile book={book} key={book._id} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            {/* Footer */}
            <Footer />
        </>
    );
}

export default FeaturedPageTags;
