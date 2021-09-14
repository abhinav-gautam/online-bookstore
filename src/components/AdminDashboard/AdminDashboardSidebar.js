import { faBook, faBookMedical, faBookReader, faBorderAll, faUserCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminDashboardSidebar = ({ url }) => {
    // Active link style
    const activeLinkStyle = {
        fontWeight: "bold",
    }
    return (
        <div className="container mt-5 ">
            <div className="ms-4">
                <div className="h3">Dashboard</div>
                <ul className="list-unstyled mt-3">
                    <li className="mb-3">
                        <NavLink exact
                            className="nav-link text-dark text-wrap"
                            activeStyle={activeLinkStyle}
                            to={`${url}/profile`}>
                            <FontAwesomeIcon icon={faUserCog} /> Profile
                        </NavLink>
                    </li>
                    <li className="">
                        <button class="btn btn-link shadow-none text-dark text-decoration-none border-0" type="button" data-bs-toggle="collapse" data-bs-target="#collapseBooks" >
                            <FontAwesomeIcon icon={faBook} /> Books
                        </button>
                    </li>
                    <div className="collapse ms-4" id="collapseBooks">
                        <NavLink exact
                            className="nav-link text-dark text-wrap"
                            activeStyle={activeLinkStyle}
                            to={`${url}/addBook`}>
                            <FontAwesomeIcon icon={faBookMedical} /> Add Book
                        </NavLink>
                        <NavLink exact
                            className="nav-link text-dark text-wrap"
                            activeStyle={activeLinkStyle}
                            to={`${url}/viewBooks`}>
                            <FontAwesomeIcon icon={faBookReader} /> View Books
                        </NavLink>
                    </div>
                    <li className="mt-3">
                        <NavLink exact
                            className="nav-link text-dark text-wrap"
                            activeStyle={activeLinkStyle}
                            to={`${url}/wishlist`}>
                            <span className="position-relative pt-2">
                                <FontAwesomeIcon icon={faBorderAll} />  Categories
                            </span>
                        </NavLink>
                    </li>
                </ul>
            </div>
            <hr />
        </div>
    );
}

export default AdminDashboardSidebar;