import React from 'react';

const CartSummary = ({ totalItems, cartSummary }) => {
    return (
        <div>
            <span className="h4 text-dark">Cart Summary</span>
            {
                totalItems
                    ? <>
                        <ul className="list-group mt-3">

                            <li className="list-group-item">
                                <div className="row fw-bold">
                                    <div className="col-9 col-xl-8 ">Gross Total <small className="text-muted fst-italic">(GSD Included)</small> </div>
                                    <div className="col-3 col-xl-4  text-nowrap">Rs. {cartSummary.grossTotal?.toFixed(2)}</div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row fw-bold text-danger">
                                    <div className="col-9 col-xl-8 ">Delivery Charge <small className="text-muted fst-italic">({totalItems} items)</small></div>
                                    <div className="col-3 col-xl-4  text-nowrap">+ Rs. {cartSummary.deliveryCharge?.toFixed(2)}</div>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row fw-bold text-success">
                                    <div className="col-9 col-xl-8">Total Discount</div>
                                    <div className="col-3 col-xl-4  text-nowrap">- Rs. {cartSummary.totalDiscount?.toFixed(2)}</div>
                                </div>
                            </li>
                        </ul>
                        <div className="card p-2 ms-auto mt-3">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Promo code" />
                                <div className="input-group-append">
                                    <button type="submit" className="btn btn-secondary">Redeem</button>
                                </div>
                            </div>
                        </div>
                        <ul className="list-group mt-3">
                            <li className="list-group-item">
                                <div className="row fw-bold ">
                                    <div className="col-9 col-xl-8 ">Net Total</div>
                                    <div className="col-3 col-xl-4  text-nowrap">Rs. {cartSummary.netTotal?.toFixed(2)}</div>
                                </div>
                            </li>
                        </ul>
                        <button className="btn btn-danger mt-3 btn-lg w-100 mb-5" type="submit">Continue to checkout</button>
                    </>
                    : <li className="list-group-item d-flex justify-content-between mt-3">
                        <div>
                            <h6 className="">Nothing to show here</h6>
                        </div>
                    </li>
            }
        </div>
    );
}

export default CartSummary;
