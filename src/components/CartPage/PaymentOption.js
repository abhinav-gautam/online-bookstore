import React from 'react';

const PaymentOption = () => {
    return (
        <div className="mb-5">
            {/* <!--Payment--> */}
            <div className="h4 mb-3">Payment</div>
            <div className="d-block my-3">
                <div className="form-check">
                    <input id="credit" className="form-check-input" name="paymentMethod" type="radio" checked="" />
                    <label className="fomr-check-label" htmlFor="credit">Credit card</label>
                </div>
                <div className="form-check">
                    <input id="debit" className="form-check-input" name="paymentMethod" type="radio" />
                    <label className="fomr-check-label" htmlFor="debit">Debit card</label>
                </div>
                <div className="form-check">
                    <input id="paypal" className="form-check-input" name="paymentMethod" type="radio" />
                    <label className="fomr-check-label" htmlFor="paypal">Paypal</label>
                </div>
            </div>

            {/* <!--Card details--> */}
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="credit-name">Name on card</label>
                    <input type="text" className="form-control" id="credit-name" />
                    <small className="text-muted">Full name as displayed on card</small>
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="credit-number">Credit card number</label>
                    <input type="text" className="form-control" id="credit-number" />
                </div>
            </div>
            <div className="row ">
                <div className="col-md-3 mb-3 me-md-5 me-lg-3 me-xl-1">
                    <label htmlFor="credit-expiration">Expiration</label>
                    <input type="text" className="form-control" id="credit-expiration" />
                </div>
                <div className="col-md-3 mb-3">
                    <label htmlFor="credit-cvv">CVV</label>
                    <input type="text" className="form-control" id="credit-cvv" />
                </div>
            </div>
            <hr className="mb-4" />

            {/* <!--Checkout button--> */}
            <button className="btn btn-primary btn-lg w-100" type="submit">Continue to checkout</button>

        </div>
    );
}

export default PaymentOption;
