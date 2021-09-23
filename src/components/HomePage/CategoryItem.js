import React from 'react';
import { NavLink } from 'react-router-dom';

const CategoryItem = ({ category, setShow, offcanvas }) => {

    // Active link style
    const activeLinkStyle = {
        fontWeight: "bold",
    }
    return (
        <li key={category._id} className="dropdown-item">
            <NavLink exact
                className="nav-link text-dark text-wrap"
                activeStyle={activeLinkStyle}
                to={`/category/${category.categoryName}`}
                onClick={() => offcanvas && setShow(false)} >
                {category.categoryName}
            </NavLink>
        </li>
    );
}

export default CategoryItem;
