/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../Helpers/Message';
import NavbarContent from './NavbarContent';
import SearchBar from './SearchBar';

const FirstNavigation = () => {

    const { categoryError } = useSelector(state => state.category)
    const { user } = useSelector(state => state.user)
    const { cartItems } = useSelector(state => state.cart)
    const [totalItems, setTotalItems] = useState(0);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    useEffect(() => {
        if (cartItems.length) {
            setTotalItems(cartItems.map(item => +item.quantity).reduce((total, current) => total += current))
        }
        if (!cartItems.length) {
            setTotalItems(0)
        }
    }, [cartItems]);


    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-between" >
                {
                    categoryError && <Message message="Error in loading Categories." variant="danger" />
                }

                {/* Title */}
                <div>
                    <Link to={user.role !== "admin" ? "/" : "#"} className="navbar-brand fs-1 text-decoration-none ms-5 cursor-pointer">Bookworm</Link>
                </div>

                {/* Search bar */}
                <div className="collapse navbar-collapse">
                    <SearchBar />
                </div>

                <div>
                    {/* Collapse Button */}
                    <button className="navbar-toggler me-5 shadow-none" onClick={() => setShow(true)}>
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Nav */}
                    <div className="collapse navbar-collapse" id="menu">
                        <ul className="navbar-nav justify-content-right align-items-center ms-auto me-5">
                            <NavbarContent totalItems={totalItems} />
                        </ul>
                    </div>
                </div>
            </nav >

            {/* Offcanvas */}
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <div>
                        <Link to={user.role === "user" ? "/" : "#"} className="navbar-brand fs-1 text-decoration-none ms-5 cursor-pointer text-dark">Bookworm</Link>
                    </div>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="mt-4">
                        <SearchBar offcanvas={true} setShow={setShow} />
                    </div>
                    <ul className="justify-content-right align-items-center mt-3 list-unstyled">
                        <NavbarContent totalItems={totalItems} offcanvas={true} setShow={setShow} />
                    </ul>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default FirstNavigation;
