import { faCartPlus, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../redux/cartSlice';
import "./bookDetailsStyles.css"

const AvailabilityDetails = ({ book }) => {
    const dispatch = useDispatch()
    const [quantity, setQuantity] = useState(1);
    return (
        <div className="mt-5">
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
            <button className="btn btn-secondary mt-4 ms-4">Add to Wishlist <FontAwesomeIcon icon={faClipboardList} /></button>
        </div>
    );
}

export default AvailabilityDetails;
