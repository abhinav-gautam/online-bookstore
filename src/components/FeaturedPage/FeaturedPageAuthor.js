/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import BookTile from '../CategoryPage/BookTile';
import LoadingSpinner from '../Helpers/LoadingSpinner';
import CategorySidebar from '../HomePage/CategorySidebar';
import Footer from '../HomePage/Footer';

const FeaturedPageAuthor = () => {
    const { author } = useParams()
    const { authorImage, authorAbout } = useLocation().state

    const { books, isBooksLoading } = useSelector(state => state.books)
    const [filteredBooks, setFilteredBooks] = useState([]);

    // Filtering books based on category
    useEffect(() => {
        setFilteredBooks(books.filter(book => book.author.includes(author)))
    }, [author, books]);

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
                        <div className="container-fluid mt-4">
                            <div className="d-flex">
                                <img src={authorImage} className="border border-white rounded-circle img-small cursor-pointer" alt="" width="150px" height="150px" />
                                <div className="ps-5">
                                    <div className="h4 text-danger fw-bold">{author}</div>
                                    <p className="lead">{authorAbout}</p>
                                </div>
                            </div>

                            <div className="display-5 mt-5 text-center">{author}'s Books</div>
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

export default FeaturedPageAuthor;
