import React from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import AvailabilityDetails from '../../BookDetailsPage/AvailabilityDetails';
import BookImage from '../../BookDetailsPage/BookImage';
import BookTitleDetails from '../../BookDetailsPage/BookTitleDetails';
import LoadingSpinner from '../../Helpers/LoadingSpinner';

const WishlistPage = () => {

    const { wishlistItems, isWishlistLoading } = useSelector(state => state.wishlist)
    const { path } = useRouteMatch()
    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3 h4">
                <span className="text-dark">Your Wishlist</span>
                <span className="badge bg-secondary rounded-circle">{wishlistItems.length}</span>
            </div>

            <ul className={path === "/userdashboard/:username/cart" ? "list-group list-group-scroll-cart mb-3" : "list-group list-group-scroll mb-3"}>
                {
                    !wishlistItems.length
                        ? <>
                            {
                                isWishlistLoading
                                    ? <LoadingSpinner message=" Loading Cart..." />
                                    : <li className="list-group-item d-flex justify-content-between">
                                        <div>
                                            <h6 className="">Nothing to show here</h6>
                                        </div>
                                    </li>
                            }
                        </>
                        : <>
                            {
                                wishlistItems.map((item, index) => (
                                    <li className="list-group-item p-5">
                                        <div className="row">
                                            <div className="col-2 ">
                                                <BookImage book={item} width="180px" height="240px" />
                                            </div>
                                            <div className="col-6 border-end pe-4">
                                                <BookTitleDetails book={item} />
                                            </div>
                                            <div className="col-4 ps-5">
                                                <AvailabilityDetails book={item} index={index} wishlist={true} />
                                            </div>
                                        </div>


                                    </li>
                                ))
                            }
                        </>
                }

            </ul>


        </div>
    );
}

export default WishlistPage;
