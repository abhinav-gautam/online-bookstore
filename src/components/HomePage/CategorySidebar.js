/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LoadingSpinner from '../Helpers/LoadingSpinner';

const CategorySidebar = () => {
    const { categories, categoryCount, isCategoryLoading } = useSelector(state => state.category)

    // Active link style
    const activeLinkStyle = {
        fontWeight: "bold",
    }
    return (
        <div className="container mt-5 ">
            <div className="ms-4">
                <div className="h3">Categories</div>
                <ul className="list-unstyled mt-3">
                    {
                        categoryCount
                            ?
                            categories.map(category => (
                                <li key={category._id} className="dropdown-item">
                                    <NavLink exact className="nav-link text-dark text-wrap" activeStyle={activeLinkStyle} to={`/${category.categoryName}`}>
                                        {category.categoryName}
                                    </NavLink>
                                </li>
                            ))
                            : isCategoryLoading &&
                            <LoadingSpinner message=" Loading Categories..." />
                    }
                </ul>
            </div>
            <hr />
        </div>
    );
}

export default CategorySidebar;
