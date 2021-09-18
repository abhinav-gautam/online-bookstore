/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import resetAllState from '../Helpers/resetAllState';
import { faBook, faColumns, faHome, faShoppingCart, faSignInAlt, faSignOutAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink, } from 'react-router-dom';
import LoadingSpinner from '../Helpers/LoadingSpinner';
import CategoryItem from './CategoryItem';
import defaultProfilePic from "../../media/defaultProfilePic.png"

const NavbarContent = ({ totalItems, offcanvas }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { categories, isCategoryLoading } = useSelector(state => state.category)
    const { user, isAuth } = useSelector(state => state.user)

    // Function to handle logout
    const handleLogout = () => {
        resetAllState(dispatch)
        history.push("/")
    }

    // Active link style
    const activeLinkStyle = {
        fontWeight: "bold",
        color: "red"
    }
    return (
        <>
            {user.role !== "admin" &&
                <>
                    <li className="nav-item text-nowrap"><NavLink exact activeStyle={activeLinkStyle} className={`nav-link ${offcanvas && "text-danger"}`} to="/"><FontAwesomeIcon icon={faHome} /> Home</NavLink></li>
                    {/* Category */}
                    <li className="nav-item dropdown">
                        <a className={`nav-link dropdown-toggle ${offcanvas && "text-danger"}`} href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <FontAwesomeIcon icon={faBook} /> Categories
                        </a>
                        <ul className="dropdown-menu">
                            {
                                categories.length
                                    ? categories.map(category => (
                                        <CategoryItem category={category} key={category._id} />
                                    ))
                                    : isCategoryLoading && <li><a className="dropdown-item" href="#"><LoadingSpinner message=" Loading Categories" /></a></li>
                            }
                        </ul>
                    </li>
                </>
            }
            {
                isAuth
                    ? <>
                        {
                            user.role === "user" && user.status === "active" &&
                            <li className={`nav-item me-4 text-nowrap ${offcanvas && "mt-2"}`}>
                                <NavLink className={`nav-link text-decoration-none position-relative ${offcanvas && "text-danger"}`} activeClassName="nav-link active" to="/userdashboard/cart">
                                    <span className=" position-relative pt-2 pe-2">
                                        <FontAwesomeIcon icon={faShoppingCart} /> Cart
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger">
                                            {totalItems}
                                        </span>
                                    </span>
                                </NavLink>
                            </li>
                        }

                        <li className="nav-item dropdown">
                            <a className={`nav-link dropdown-toggle ${offcanvas && "text-danger"}`} href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {
                                    user.name + " "
                                }
                                {
                                    user.profilePicture
                                        ?
                                        <img src={user.profilePicture} className="border border-dark rounded-circle" width="50px" alt="" />
                                        :
                                        <img src={defaultProfilePic} className="border border-dark rounded-circle" width="50px" alt="" />
                                }
                            </a>
                            <ul className="dropdown-menu text-center" aria-labelledby="navbarDropdownMenuLink">
                                {
                                    user.role === "user" && user.status === "active" &&
                                    <li className="nav-item" ><NavLink exact className="nav-link text-dark" to="/userdashboard/profile" ><FontAwesomeIcon icon={faColumns} /> Dashboard</NavLink></li>
                                }
                                <li className="nav-item" ><NavLink exact className="nav-link text-dark" to="/" onClick={handleLogout}><FontAwesomeIcon icon={faSignOutAlt} /> Logout</NavLink></li>
                            </ul>
                        </li>
                    </>
                    :
                    <>
                        <li className="nav-item"><NavLink exact activeStyle={activeLinkStyle} className={`nav-link ${offcanvas && "text-danger"}`} to="/login"><FontAwesomeIcon icon={faSignInAlt} /> Login</NavLink></li>
                        <li className="nav-item"><NavLink exact activeStyle={activeLinkStyle} className={`nav-link ${offcanvas && "text-danger"}`} to="/register"><FontAwesomeIcon icon={faUserPlus} /> Register</NavLink></li>
                    </>
            }

        </>
    );
}

export default NavbarContent;
