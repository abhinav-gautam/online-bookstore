import { faCartPlus, faClipboardList, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../redux/cartReducers';
import { addItemToWishlist, removeWishlistItem } from '../../redux/wishlistReducers';
import "./bookDetailsStyles.css"

const AvailabilityDetails = ({ book, wishlist, index }) => {
    const dispatch = useDispatch()
    const { wishlistItems } = useSelector(state => state.wishlist)
    const [quantity, setQuantity] = useState(1);
    return (
        <div className="">
            <p className="text-success fs-3 fw-bold">Available</p>
            <p>Ships within <strong>4-6 Days</strong></p>
            <p>Shipping Charge: ₹ 40</p>
            <div className="d-flex align-items-center">
                <div>Quantity:</div>
                <div className="input-group input-group-custom ms-4">
                    <div className="input-group-text cursor-pointer" onClick={() => quantity >= 2 && setQuantity(+quantity - 1)}>-</div>
                    <input type="text" className="form-control text-center" placeholder="Qty" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                    <div className="input-group-text cursor-pointer" onClick={() => quantity >= 1 && setQuantity(+quantity + 1)}>+</div>
                </div>
            </div>
            <button className="btn btn-danger mt-4" onClick={() => dispatch(addItemToCart({ book, quantity }))}>Add to Cart <FontAwesomeIcon icon={faCartPlus} /></button>
            {
                !wishlist ?
                    <button className="btn btn-secondary mt-4 ms-4" onClick={() => !JSON.stringify(wishlistItems).includes(JSON.stringify(book)) && dispatch(addItemToWishlist({ book }))}>Add to Wishlist <FontAwesomeIcon icon={faClipboardList} /></button>
                    : <>
                        <br />
                        <button className="btn btn-secondary mt-4" onClick={() => dispatch(removeWishlistItem({ book, index }))}>Remove from Wishlist <FontAwesomeIcon icon={faTrashAlt} /></button>
                    </>
            }
        </div>
    );
}

export default AvailabilityDetails;
