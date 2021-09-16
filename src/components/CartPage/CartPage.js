/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CartSummary from './CartSummary';
import HomeCart from './HomeCart';

const CartPage = () => {
    const { cartItems, isCartLoading } = useSelector(state => state.cart)
    const [cartSummary, setCartSummary] = useState({});
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        if (cartItems.length) {
            setTotalItems(cartItems.map(item => +item.quantity).reduce((total, current) => total += current))
        }
        if (!cartItems.length) {
            setTotalItems(0)
        }
    }, [cartItems]);

    // Calculating cart summary
    useEffect(() => {
        const uniqueItems = cartItems.length
        const deliveryCharge = totalItems * 40
        let grossTotal = 0
        let totalDiscount = 0
        if (uniqueItems) {
            grossTotal = cartItems.map(item => +item.book.price * item.quantity).reduce((total, current) => total += current) + deliveryCharge
            totalDiscount = cartItems.map(item => +item.book.price * +item.book.discount / 100 * item.quantity).reduce((total, current) => total += current)
        }
        if (isNaN(totalDiscount)) {
            totalDiscount = 0
        }
        const netTotal = grossTotal - totalDiscount
        setCartSummary({ totalDiscount, grossTotal, netTotal, deliveryCharge })
    }, [cartItems, totalItems]);
    return (
        <>
            <div className="container-fluid top-margin-150">
                <div className="row mt-5">
                    <div className="col-12 col-md-6 ps-5">
                        <HomeCart
                            cartItems={cartItems} totalItems={totalItems}
                            isCartLoading={isCartLoading} cartSummary={cartSummary} />
                    </div>
                    <div className="col-12 col-md-6 ps-5">
                        <CartSummary cartSummary={cartSummary} totalItems={totalItems} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default CartPage;
