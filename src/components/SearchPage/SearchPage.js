/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import BookTile from '../CategoryPage/BookTile';
import CategorySidebar from '../HomePage/CategorySidebar';

const useQuery = () => new URLSearchParams(useLocation().search)

const SearchPage = () => {
    const query = useQuery().get("query").toLowerCase()

    const { books } = useSelector(state => state.books)

    const [filteredBooks, setFilteredBooks] = useState([]);

    // Filtering books based on search query
    useEffect(() => {
        setFilteredBooks(books.filter(book =>
            book.bookTitle.toLowerCase().includes(query) ||
            book.author.toLowerCase().includes(query) ||
            book.publisher.toLowerCase().includes(query) ||
            book.isbn.toString().includes(query)
        ))
    }, [query]);

    return (
        <div className="container-fluid">
            <div className="row">

                {/* Categories Sidebar */}
                <div className="col-2">
                    <CategorySidebar />
                </div>

                {/* Main Content */}
                <div className="col-10 border-start mt-4 mb-5 ps-5">
                    <div className="display-5 mt-5">Search Results for "{query}"</div>
                    <div className="mt-3">{filteredBooks.length} books found</div>
                    {
                        filteredBooks.map(book => (
                            <BookTile book={book} />
                        ))
                    }
                    {
                        !filteredBooks.length &&
                        <div className="mt-5 fs-3">Whoops! No books found.</div>
                    }
                </div>
            </div>
        </div>
    );
}

export default SearchPage;
