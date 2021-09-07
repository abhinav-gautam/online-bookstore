import { faCartPlus, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../redux/cartSlice';

const AvailabilityDetails = ({ book }) => {
    const dispatch = useDispatch()
    return (
        <div className="mt-5">
            <p className="text-success fs-3 fw-bold">Available</p>
            <p>Ships within <strong>4-6 Days</strong></p>
            <p>Shipping Charge: ₹ 40</p>
            <button className="btn btn-danger" onClick={() => dispatch(addItemToCart(book))}>Add to Cart <FontAwesomeIcon icon={faCartPlus} /></button>
            <button className="btn btn-secondary ms-4">Add to Wishlist <FontAwesomeIcon icon={faClipboardList} /></button>
        </div>
    );
}

export default AvailabilityDetails;
