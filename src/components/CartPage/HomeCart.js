import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { removeCartItem, updateItemQty } from '../../redux/cartReducers';
import LoadingSpinner from '../Helpers/LoadingSpinner';

const HomeCart = ({ cartItems, totalItems, isCartLoading, cartSummary }) => {

    const { path } = useRouteMatch()
    const dispatch = useDispatch()

    const handleRemoveCartItem = (itemIndex) => {
        dispatch(removeCartItem(itemIndex))
    }
    // Decrease the quantity only if its greater than 1 
    // else completey removing the item from the cart
    const decQty = ({ item, index }) => {
        let newCart = JSON.parse(JSON.stringify(cartItems))
        if (newCart[index].quantity === 1) {
            dispatch(removeCartItem({ item, index }))
        } else {
            newCart[index].quantity--
            dispatch(updateItemQty(newCart[index]))
        }
    }
    // Increasing the quantity 
    const incQty = (index) => {
        let newCart = JSON.parse(JSON.stringify(cartItems))
        newCart[index].quantity++
        dispatch(updateItemQty(newCart[index]))
    }

    return (
        <div className={path === "/userdashboard/:username/cart" ? "" : " width-450"}>
            <div className="d-flex justify-content-between align-items-center mb-3 h4">
                <span className="text-dark">Your cart</span>
                <span className="badge bg-secondary rounded-circle">{totalItems}</span>
            </div>

            <ul className={path === "/userdashboard/:username/cart" ? "list-group list-group-scroll-cart mb-3" : "list-group list-group-scroll mb-3"}>
                {
                    !totalItems
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
                                        <div className="row cp-itemContainer">
                                            <div className="col-10 d-flex ">
                                                <div className="hc-bookImage">
                                                    <img src={item.book.bookImage} alt="" width="150px" height="210px" />
                                                </div>
                                                <div className="ps-4 hc-bookTitleDetails">
                                                    <h6 className="fw-bold fs-5 ">{item.book.bookTitle}</h6>
                                                    <div className="d-flex mt-3">
                                                        <div className="pe-5">
                                                            <p><strong>Author:</strong> {item.book.author}</p>
                                                            <p><strong>Publisher:</strong> {item.book.publisher}</p>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div><strong>Quantity:</strong></div>
                                                        <div className="input-group input-group-sm input-group-custom ms-4">
                                                            <div className="input-group-text cursor-pointer" onClick={() => decQty({ item, index })}>-</div>
                                                            <input type="text" className="form-control text-center" placeholder="Qty" value={item.quantity} />
                                                            <div className="input-group-text cursor-pointer" onClick={() => incQty(index)}>+</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-2 ">
                                                <div className="d-flex flex-column cp-priceContainer align-items-end">
                                                    <div className="text-muted">
                                                        <small className="text-nowrap"> {item.quantity} X Rs. {item.book.price}=</small>
                                                    </div>
                                                    <div className="fw-bold text-danger text-nowrap">
                                                        Rs. {item.quantity * item.book.price}
                                                    </div>
                                                    <div onClick={() => handleRemoveCartItem({ item, index })} className="text-muted cursor-pointer"><FontAwesomeIcon icon={faTrashAlt} /></div>
                                                </div>
                                            </div>
                                        </div>


                                    </li>
                                ))
                            }
                            <li className="list-group-item d-flex justify-content-between fw-bold">
                                <span>Total <small className="text-muted fst-italic">({totalItems} items)</small></span>
                                Rs. {(cartSummary.netTotal - cartSummary.deliveryCharge)}
                            </li>
                        </>
                }

            </ul>


        </div>
    );
}

export default HomeCart;
