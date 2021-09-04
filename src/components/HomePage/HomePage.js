/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getFeaturedAuthors } from '../../redux/authorsSlice';
import { getFeaturedBooks } from '../../redux/booksSlice';
import CategorySidebar from './CategorySidebar';
import FeaturedAuthors from './FeaturedAuthors';
import { getCategories } from '../../redux/categorySlice';
import FeaturedBooks from './FeaturedBooks';
import HomeCarousel from './HomeCarousel';

const HomePage = () => {
    const { featuredBooks, isFeaturedBooksLoading } = useSelector(state => state.books)
    const { featuredAuthors, isFeaturedAuthorsLoading } = useSelector(state => state.authors)
    const { categoryCount, categories } = useSelector(state => state.category)

    const dispatch = useDispatch()

    // Loading categories from db 
    useEffect(() => {
        if (!categoryCount) {
            dispatch(getCategories())
        }
    }, [categories]);

    // Loading featured books from db 
    useEffect(() => {
        if (!featuredBooks.bestseller.length) {
            dispatch(getFeaturedBooks("bestseller"))
        }
    }, [featuredBooks.bestseller]);
    useEffect(() => {
        if (!featuredBooks.newArrival.length) {
            dispatch(getFeaturedBooks("newArrival"))
        }
    }, [featuredBooks.newArrival]);
    useEffect(() => {
        if (!featuredBooks.awarded.length) {
            dispatch(getFeaturedBooks("awarded"))
        }
    }, [featuredBooks.awarded]);

    // Loading authors from db
    useEffect(() => {
        if (!featuredAuthors?.length) {
            dispatch(getFeaturedAuthors())
        }
    }, [featuredAuthors]);

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
