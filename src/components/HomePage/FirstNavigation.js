/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { faBook, faColumns, faHome, faShoppingCart, faSignInAlt, faSignOutAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom';
import LoadingSpinner from '../Helpers/LoadingSpinner';
import Message from '../Helpers/Message';
import resetAllState from '../Helpers/resetAllState';
import CategoryItem from './CategoryItem';
import defaultProfilePic from "../../media/defaultProfilePic.png"

const FirstNavigation = () => {

    const { categories, isCategoryLoading, categoryError } = useSelector(state => state.category)
    const { user, isAuth } = useSelector(state => state.user)
    const { cartItems } = useSelector(state => state.cart)
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        if (cartItems.length) {
            setTotalItems(cartItems.map(item => +item.quantity).reduce((total, current) => total += current))
        }
        if (!cartItems.length) {
            setTotalItems(0)
        }
    }, [cartItems]);


    const { register, handleSubmit, reset } = useForm();

    const history = useHistory()
    const dispatch = useDispatch()

    const onSearchFormSubmit = searchField => {
        history.push(`/search?query=${searchField.searchQuery}`)
        reset()
    }

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
        <nav className="navbar navbar-expand-md navbar-dark bg-dark d-flex justify-content-between" >
            {
                categoryError && <Message message="Error in loading Categories." variant="danger" />
            }

            {/* Title */}
            <div>
                <Link to={user.role === "user" ? "/" : "#"} className="navbar-brand fs-1 text-decoration-none ms-5 cursor-pointer">Bookworm</Link>
            </div>

            {/* Search bar */}
            {
                (!isAuth || user.role === "user") &&
                <div className="w-25">
                    <form className="d-flex" onSubmit={handleSubmit(onSearchFormSubmit)}>
                        <input
                            className="form-control me-2"
                            type="search" name="searchQuery"
                            placeholder="Search by Title, Author, Publisher or ISBN"
                            {...register("searchQuery", { required: true })} />
                        <button className="btn btn-outline-danger" type="submit">Search</button>
                    </form>
                </div>
            }

            {/* Right options */}
            <div className="">
                {/* Collapse Button */}
                <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#menu">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Nav */}
                <div className="collapse navbar-collapse" id="menu">
                    <ul className="navbar-nav justify-content-evenly align-items-center ms-auto me-5">
                        {user.role !== "admin" &&
                            <>
                                <li className="nav-item"><NavLink exact activeStyle={activeLinkStyle} className="nav-link" to="/"><FontAwesomeIcon icon={faHome} /> Home</NavLink></li>
                                {/* Category */}
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <FontAwesomeIcon icon={faBook} /> Categories
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        {
                                            categories.length
                                                ? categories.map(category => (
                                                    <CategoryItem category={category} />
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
                                        <li className="nav-item me-4">
                                            <NavLink className="nav-link text-decoration-none position-relative" activeClassName="nav-link active position-relative" to="/userdashboard/cart"><FontAwesomeIcon icon={faShoppingCart} /> Cart  <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger">
                                                {totalItems}
                                            </span></NavLink>
                                        </li>
                                    }

                                    <li className="nav-item dropdown me-5">
                                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
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
                                    <li className="nav-item"><NavLink exact activeStyle={activeLinkStyle} className="nav-link" to="/login"><FontAwesomeIcon icon={faSignInAlt} /> Login</NavLink></li>
                                    <li className="nav-item"><NavLink exact activeStyle={activeLinkStyle} className="nav-link" to="/register"><FontAwesomeIcon icon={faUserPlus} /> Register</NavLink></li>
                                </>
                        }

                    </ul>
                </div>
            </div>
        </nav >
    );
}

export default FirstNavigation;
