import { faClipboard, faShoppingCart, faUserCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, } from 'react-router-dom';

const UserDashboardSidebar = ({ url }) => {
    const [totalItems, setTotalItems] = useState(0);
    const { cartItems } = useSelector(state => state.cart)

    useEffect(() => {
        if (cartItems.length) {
            setTotalItems(cartItems.map(item => +item.quantity).reduce((total, current) => total += current))
        }
    }, [cartItems]);

    // Active link style
    const activeLinkStyle = {
        fontWeight: "bold",
    }
    return (
        <div className="container mt-5 ">
            <div className="ms-4">
                <div className="h3">Dashboard</div>
                <ul className="list-unstyled mt-3">
                    <li className="dropdown-item">
                        <NavLink exact
                            className="nav-link text-dark text-wrap"
                            activeStyle={activeLinkStyle}
                            to={`${url}/profile`}>
                            <FontAwesomeIcon icon={faUserCog} /> Profile
                        </NavLink>
                    </li>
                    <li className="dropdown-item">
                        <NavLink exact
                            className="nav-link text-dark text-wrap"
                            activeStyle={activeLinkStyle}
                            to={`${url}/cart`}>
                            <span className="position-relative pt-2">
                                <FontAwesomeIcon icon={faShoppingCart} /> Cart
                                <span class="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger">
                                    {totalItems}
                                </span>
                            </span>
                        </NavLink>
                    </li>
                    <li className="dropdown-item">
                        <NavLink exact
                            className="nav-link text-dark text-wrap"
                            activeStyle={activeLinkStyle}
                            to={`${url}/wishlist`}>
                            <FontAwesomeIcon icon={faClipboard} /> Wishlist
                        </NavLink>
                    </li>
                </ul>
            </div>
            <hr />
        </div>
    );
}

export default UserDashboardSidebar;
