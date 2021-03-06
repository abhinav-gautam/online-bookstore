/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useSelector } from 'react-redux';
import CategorySidebar from './CategorySidebar';
import FeaturedAuthors from './FeaturedAuthors';
import FeaturedBooks from './FeaturedBooks';
import HomeCarousel from './HomeCarousel';
import Footer from './Footer';

const HomePage = () => {
    const { books, isBooksLoading } = useSelector(state => state.books)

    const { authors, isAuthorsLoading } = useSelector(state => state.authors)

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
                        {/* Home Carousel */}
                        <HomeCarousel />
                        <div className="container-fluid text-center">
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

            </div>
            {/* Footer */}
            <Footer />
        </>
    );
}

export default HomePage;
