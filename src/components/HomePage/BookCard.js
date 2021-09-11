import { faCartPlus, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { addItemToCart } from '../../redux/cartReducers';

const BookCard = ({ book }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { isAuth } = useSelector(state => state.user)
    return (
        <div className="col d-flex align-items-stretch" key={book._id} >
            <div className="card mt-5 shadow w-75 cursor-pointer" >
                <span className="position-absolute top-0 start-0 translate-middle badge rounded-circle bg-danger p-2" >
                    20% <br /> off
                    <span className="visually-hidden">discount</span>
                </span>
                <div className="card-body w-100">
                    <div onClick={() => history.push({ pathname: `/book/${book._id}`, state: { book } })}>
                        <img src={book.bookImage} alt="" width="100%" height="320px" />
                        <div className="mt-3 mb-3">
                            <span className="text-decoration-line-through me-3">₹ {book.price * .20 + book.price}</span>
                            <span className="fs-3 fw-bold text-danger">₹ {book.price}</span>
                        </div>
                        <p className="h5 fw-bold">
                            {
                                book.bookTitle.split(" ").length > 5
                                    ? book.bookTitle.split(" ").slice(0, 5).join(" ") + " ..."
                                    : book.bookTitle
                            }
                        </p>
                        <p className="small">{book.author}</p>
                    </div>
                    {
                        isAuth &&
                        <div className="btn-group">
                            <button className="btn btn-sm btn-danger " onClick={() => dispatch(addItemToCart({ book, quantity: 1 }))}>Add to Cart <FontAwesomeIcon icon={faCartPlus} /></button>
                            <button className="btn btn-sm btn-secondary">Add to Wishlist <FontAwesomeIcon icon={faClipboardList} /></button>
                        </div>
                    }

                </div>
            </div>
        </div >
    );
}

export default BookCard;
