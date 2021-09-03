/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getFeaturedAuthors } from '../../redux/authorsSlice';
import { getFeaturedBooks } from '../../redux/booksSlice';
import CategorySidebar from './CategorySidebar';
import FeaturedAuthors from './FeaturedAuthors';
import FeaturedBooks from './FeaturedBooks';
import HomeCarousel from './HomeCarousel';

const HomePage = () => {
    const { featuredBooks, isFeaturedBooksLoading } = useSelector(state => state.books)
    const { featuredAuthors, isFeaturedAuthorsLoading } = useSelector(state => state.authors)

    const dispatch = useDispatch()

    // Loading categories from db 
    useEffect(() => {
        if (!featuredBooks.bestseller.length) {
            dispatch(getFeaturedBooks("bestseller"))
        }
        if (!featuredBooks.newArrival.length) {
            dispatch(getFeaturedBooks("newArrival"))
        }
        if (!featuredBooks.awarded.length) {
            dispatch(getFeaturedBooks("awarded"))
        }
    }, [featuredBooks]);

    // Loading authors from db
    useEffect(() => {
        if (!featuredAuthors?.length) {
            dispatch(getFeaturedAuthors())
        }
    }, [featuredAuthors?.length]);

    return (
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
                        books={featuredBooks.bestseller}
                        isFeaturedBooksLoading={isFeaturedBooksLoading} />
                    <FeaturedBooks
                        title="New Arrivals"
                        books={featuredBooks.newArrival}
                        isFeaturedBooksLoading={isFeaturedBooksLoading} />
                    <FeaturedBooks
                        title="Award Winners"
                        books={featuredBooks.awarded}
                        isFeaturedBooksLoading={isFeaturedBooksLoading} />

                    {/* Featured Authors */}
                    <FeaturedAuthors
                        featuredAuthors={featuredAuthors}
                        isFeaturedAuthorsLoading={isFeaturedAuthorsLoading} />
                </div>
            </div>
        </div>
    );
}

export default HomePage;
