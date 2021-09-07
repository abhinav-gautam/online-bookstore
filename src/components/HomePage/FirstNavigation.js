/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { faBook, faHome, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link, NavLink, useHistory, useRouteMatch } from 'react-router-dom';
import LoadingSpinner from '../Helpers/LoadingSpinner';
import Message from '../Helpers/Message';
import CategoryItem from './CategoryItem';

const FirstNavigation = () => {

    const { categories, isCategoryLoading, categoryError } = useSelector(state => state.category)

    const { register, handleSubmit, reset } = useForm();

    const history = useHistory()

    // const { url } = useRouteMatch()
    // console.log(url);

    const onSearchFormSubmit = searchField => {
        history.push(`/search?query=${searchField.searchQuery}`)
        reset()
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
                <Link to="/" className="navbar-brand fs-1 text-decoration-none ms-5 cursor-pointer">Bookworm</Link>
            </div>

            {/* Search bar */}
            <div className="w-25">
                {
                    // url !== "/login" && url !== "/register" &&
                    <form className="d-flex" onSubmit={handleSubmit(onSearchFormSubmit)}>
                        <input
                            className="form-control me-2"
                            type="search" name="searchQuery"
                            placeholder="Search by Title, Author, Publisher or ISBN"
                            {...register("searchQuery", { required: true })} />
                        <button className="btn btn-outline-danger" type="submit">Search</button>
                    </form>
                }
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
                                    categories.length
                                        ? categories.map(category => (
                                            <CategoryItem category={category} />
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
