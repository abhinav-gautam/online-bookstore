import React from 'react';
import { NavLink, } from 'react-router-dom';

const UserDashboardSidebar = ({ url }) => {
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
                            Profile
                        </NavLink>
                    </li>
                    <li className="dropdown-item">
                        <NavLink exact
                            className="nav-link text-dark text-wrap"
                            activeStyle={activeLinkStyle}
                            to={`${url}/cart`}>
                            Cart
                        </NavLink>
                    </li>
                    <li className="dropdown-item">
                        <NavLink exact
                            className="nav-link text-dark text-wrap"
                            activeStyle={activeLinkStyle}
                            to={`${url}/wishlist`}>
                            Wishlist
                        </NavLink>
                    </li>
                </ul>
            </div>
            <hr />
        </div>
    );
}

export default UserDashboardSidebar;
