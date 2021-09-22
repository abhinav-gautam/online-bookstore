import React from 'react';
import { NavLink } from 'react-router-dom';

const SecondNavbar = () => {
    const featureTitle = [
        { feature: "bestseller", title: "Bestsellers" },
        { feature: "newArrival", title: "New Arrivals" },
        { feature: "awarded", title: "Awarded" },
    ]
    return (
        <ul className="nav nav-pills mt-3 justify-content-evenly">
            {
                featureTitle.map((item, index) => (
                    <li className="nav-item" key={index}>
                        <NavLink className="nav-link text-danger fw-bold text-decoration-none" activeClassName="nav-link text-white bg-danger active" to={{ pathname: `/featured/${item.feature}`, state: { title: item.title } }}> {item.title}</NavLink>
                    </li>
                ))
            }
        </ul>
    );
}

export default SecondNavbar;
