/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CartSummary from './CartSummary';
import HomeCart from './HomeCart';

const CartPage = () => {
    const { cartItems, cartCount, isCartLoading } = useSelector(state => state.cart)
    const [cartSummary, setCartSummary] = useState({});

    useEffect(() => {
        const deliveryCharge = cartCount * 40
        let netTotal = 0
        if (cartCount) {
            netTotal = cartItems.map(item => +item.price).reduce((total, current) => total += current) + deliveryCharge
        }
        const totalDiscount = netTotal * .20
        const grossTotal = netTotal + totalDiscount
        console.log(grossTotal);
        setCartSummary({ totalDiscount, netTotal, grossTotal, deliveryCharge })
    }, [cartCount]);
    return (
        <>
            <div className="container-fluid top-margin-150">
                <div className="row mt-5">
                    <div className="col-12 col-md-6 ps-5">
                        <HomeCart
                            cartItems={cartItems} cartCount={cartCount}
                            isCartLoading={isCartLoading} cartSummary={cartSummary} />
                    </div>
                    <div className="col-12 col-md-6 ps-5">
                        <CartSummary cartSummary={cartSummary} cartCount={cartCount} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default CartPage;
