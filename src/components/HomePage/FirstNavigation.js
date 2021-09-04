/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { faBook, faHome, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LoadingSpinner from '../Helpers/LoadingSpinner';
import Message from '../Helpers/Message';

const FirstNavigation = () => {

    const { categories, categoryCount, isCategoryLoading, categoryError } = useSelector(state => state.category)

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
                <a className="navbar-brand fs-1 text-decoration-none ms-5 cursor-pointer">Bookworm</a>
            </div>

            {/* Search bar */}
            <div className="w-25">
                <form class="d-flex">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button class="btn btn-outline-danger" type="submit">Search</button>
                </form>
            </div>

            {/* Right options */}
            <div className="">
                {/* Collapse Button */}
                <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#menu">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Nav */}
                <div className="collapse navbar-collapse" id="menu">
                    <ul className="navbar-nav justify-content-evenly ms-auto me-5">
                        <li className="nav-item"><NavLink exact activeStyle={activeLinkStyle} className="nav-link" to="/"><FontAwesomeIcon icon={faHome} /> Home</NavLink></li>
                        {/* Categories Dropdown */}
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <FontAwesomeIcon icon={faBook} /> Categories
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                {
                                    categoryCount
                                        ? categories.map(category => (
                                            <li key={category._id} className="dropdown-item">
                                                <NavLink exact className="nav-link text-dark" to={`/${category.categoryName}`}>
                                                    {category.categoryName}
                                                </NavLink>
                                            </li>
                                        ))
                                        : isCategoryLoading && <li><a className="dropdown-item" href="#"><LoadingSpinner message=" Loading Categories" /></a></li>
                                }
                            </ul>
                        </li>
                        <li className="nav-item"><NavLink exact activeStyle={activeLinkStyle} className="nav-link" to="/login"><FontAwesomeIcon icon={faSignInAlt} /> Login</NavLink></li>
                        <li className="nav-item"><NavLink exact activeStyle={activeLinkStyle} className="nav-link" to="/register"><FontAwesomeIcon icon={faUserPlus} /> Register</NavLink></li>

                    </ul>
                </div>
            </div>
        </nav >
    );
}

export default FirstNavigation;
