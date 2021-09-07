/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getAuthors, } from '../../redux/authorsSlice';
import { getBooks, } from '../../redux/booksSlice';
import CategorySidebar from './CategorySidebar';
import FeaturedAuthors from './FeaturedAuthors';
import { getCategories } from '../../redux/categorySlice';
import FeaturedBooks from './FeaturedBooks';
import HomeCarousel from './HomeCarousel';
import Footer from './Footer';

const HomePage = () => {
    const { books, isBooksLoading } = useSelector(state => state.books)

    const { authors, isAuthorsLoading } = useSelector(state => state.authors)
    const { categories } = useSelector(state => state.category)

    const dispatch = useDispatch()

    // Loading categories from db 
    useEffect(() => {
        if (!categories.length) {
            dispatch(getCategories())
        }
    }, []);

    // Loading books from db 
    useEffect(() => {
        if (!books.length) {
            dispatch(getBooks())
        }
    }, []);

    // Loading authors from db
    useEffect(() => {
        if (!authors.length) {
            dispatch(getAuthors())
        }
    }, []);

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
                        {/* Home Carousel */}
                        <HomeCarousel />

                        {/* Featured Books */}
                        <FeaturedBooks
                            title="Bestsellers"
                            books={books}
                            isBooksLoading={isBooksLoading}
                            feature="bestseller" />
                        <FeaturedBooks
                            title="New Arrivals"
                            books={books}
                            isBooksLoading={isBooksLoading}
                            feature="newArrival" />
                        <FeaturedBooks
                            title="Award Winners"
                            books={books}
                            isBooksLoading={isBooksLoading}
                            feature="awarded" />

                        {/* Featured Authors */}
                        <FeaturedAuthors
                            authors={authors}
                            isAuthorsLoading={isAuthorsLoading} />
                    </div>
                </div>

            </div>
            {/* Footer */}
            <Footer />
        </>
    );
}

export default HomePage;
