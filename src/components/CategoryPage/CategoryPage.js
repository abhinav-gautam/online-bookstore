/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import CategorySidebar from '../HomePage/CategorySidebar';
import Footer from '../HomePage/Footer';
import BookTile from './BookTile';

const CategoryPage = () => {
    const { category } = useParams()

    const { books } = useSelector(state => state.books)
    const [filteredBooks, setFilteredBooks] = useState([]);

    // Filtering books based on category
    useEffect(() => {
        setFilteredBooks(books.filter(book => book.category === category))
    }, [category]);

    return (
        <>
            <div className="container-fluid">
                <div className="row">

                    {/* Categories Sidebar */}
                    <div className="col-2">
                        <CategorySidebar />
                    </div>

                    {/* Main Content */}
                    <div className="col-10 border-start mt-4 mb-5 ps-5">
                        <div className="display-5 mt-5">{category} Books</div>
                        <div className="mt-3">{filteredBooks.length} books found</div>
                        {
                            filteredBooks.map(book => (
                                <BookTile book={book} />
                            ))
                        }
                    </div>
                </div>
            </div>
            {/* Footer */}
            <Footer />
        </>
    );
}

export default CategoryPage;
