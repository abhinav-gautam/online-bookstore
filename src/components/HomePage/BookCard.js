import { faCartPlus, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { addItemToCart } from '../../redux/cartReducers';
import { addItemToWishlist } from '../../redux/wishlistReducers';

const BookCard = ({ book }) => {
    const dispatch = useDispatch()
    const { wishlistItems } = useSelector(state => state.wishlist)
    const history = useHistory()
    const { isAuth, user } = useSelector(state => state.user)
    return (
        <div className="col justify-content-center mb-5" key={book._id} >
            <div className="card mt-5 shadow cursor-pointer h-100" >
                {
                    book.discount &&
                    <span className="position-absolute top-0 start-0 translate-middle badge rounded-circle bg-danger p-2" >
                        {book.discount}% <br /> off
                        <span className="visually-hidden">discount</span>
                    </span>
                }
                <div className="card-body w-100">
                    <div onClick={() => history.push({ pathname: `/book/${book._id}`, state: { book } })}>
                        <img src={book.bookImage} alt="" width="100%" />
                        <div className="mt-3 mb-3">
                            {
                                book.discount ?
                                    <>
                                        <span className="text-decoration-line-through me-3">₹ {book.price}</span>
                                        <span className="fs-3 fw-bold text-danger">₹ {Math.round(+book.price - +book.price * +book.discount / 100)}</span>
                                    </>
                                    :
                                    <div className="fs-3 fw-bold text-center text-danger">₹ {book.price}</div>
                            }
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
                        isAuth && user.status === "active" &&
                        <div className="btn-group">
                            <button className="btn btn-sm btn-danger " onClick={() => dispatch(addItemToCart({ book, quantity: 1 }))}>
                                <span className="">Add to Cart</span> <FontAwesomeIcon icon={faCartPlus} />
                            </button>
                            <button className="btn btn-sm btn-secondary" onClick={() => !JSON.stringify(wishlistItems).includes(JSON.stringify(book)) && dispatch(addItemToWishlist({ book }))}>
                                <span className="">Add to Whishlist</span> <FontAwesomeIcon icon={faClipboardList} />
                            </button>
                        </div>
                    }

                </div>
            </div>
        </div >
    );
}

export default BookCard;
