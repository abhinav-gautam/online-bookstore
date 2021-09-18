/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { addToRecentlyViewed } from '../../redux/booksSlice';
import Footer from '../HomePage/Footer';
import BookDetails from './BookDetails';
import BooksSidebar from './BooksSidebar';

const BookDetailsPage = () => {
    const { book } = useLocation().state
    const { recentlyViewed } = useSelector(state => state.books)
    const dispatch = useDispatch()

    useEffect(() => {
        if (recentlyViewed.indexOf(book) === -1) {
            dispatch(addToRecentlyViewed(book))
        }
    }, [book]);

    return (
        <>
            <div className="container-fluid">
                <div className="row">

                    {/* Main Content */}
                    <div className="col-xl-8 col-lg-7 mt-4 mb-5  ps-5">
                        <BookDetails book={book} />
                    </div>
                    {/* Suggested books Sidebar */}
                    <div className="col-xl-3 col-lg-4">
                        <BooksSidebar recentlyViewed={recentlyViewed} />
                    </div>
                </div>
            </div>
            {/* Footer */}
            <Footer />
        </>
    );
}

export default BookDetailsPage;
