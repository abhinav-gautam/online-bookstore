import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { removeCartItem } from '../../redux/cartSlice';
import LoadingSpinner from '../Helpers/LoadingSpinner';

const HomeCart = ({ cartItems, cartCount, isCartLoading, cartSummary }) => {

    const { path } = useRouteMatch()
    const dispatch = useDispatch()

    const handleRemoveCartItem = (item) => {
        dispatch(removeCartItem(item))
    }

    return (
        <div className={path === "/userdashboard/:username/cart" ? "" : " width-450"}>
            <div className="d-flex justify-content-between align-items-center mb-3 h4">
                <span className="text-dark">Your cart</span>
                <span className="badge bg-secondary rounded-circle">{cartCount}</span>
            </div>

            <ul className={path === "/userdashboard/:username/cart" ? "list-group list-group-scroll-cart mb-3" : "list-group list-group-scroll mb-3"}>
                {
                    !cartCount
                        ? <>
                            {
                                isCartLoading
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
                                cartItems.map((item, index) => (
                                    <li className="list-group-item ">
                                        <div className="row">
                                            <div className="col-10 d-flex">
                                                <div>
                                                    <img src={item.bookImage} alt="" width="100px" height="130px" />
                                                </div>
                                                <div className="ps-4">
                                                    <h6 className="fw-bold fs-5">{item.bookTitle}</h6>
                                                    <div className="d-flex mt-3">
                                                        <div className="pe-5">
                                                            <p><strong>Author:</strong> {item.author}</p>
                                                            <p><strong>Publisher:</strong> {item.publisher}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-2">
                                                <div className="d-flex flex-column align-items-end">
                                                    <div className="fw-bold text-danger">
                                                        Rs. {item.price}
                                                    </div>
                                                    <div onClick={() => handleRemoveCartItem({ item, index })} className="text-muted cursor-pointer"><FontAwesomeIcon icon={faTrashAlt} /></div>
                                                </div>
                                            </div>
                                        </div>


                                    </li>
                                ))
                            }
                            <li className="list-group-item d-flex justify-content-between ">
                                <span>Total </span>
                                <strong>Rs. {(cartSummary.netTotal - cartSummary.deliveryCharge)}
                                </strong>
                            </li>
                        </>
                }

            </ul>


        </div>
    );
}

export default HomeCart;
