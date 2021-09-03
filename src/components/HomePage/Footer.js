import React from 'react';
import "./homeStyles.css"

const Footer = () => {
    return (
        <footer className="container-fluid footer bg-dark pt-5 text-white ">
            <div className="row margin-start-50">
                <div className="col-md-3 col-sm-6">
                    <div>
                        <p className="footer-heading ms-4">my account</p>
                        <ul className="footer-ul">
                            <li>Orders</li>
                            <li>Returns / Refunds</li>
                            <li>Track Order</li>
                            <li>Frequently Asked Questions</li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6">
                    <div>
                        <p className="footer-heading ms-4">policies</p>
                        <ul className="footer-ul">
                            <li>Payment Options</li>
                            <li>Terms & Conditions of Use</li>
                            <li>Terms & Condition of Membership Program</li>
                            <li>Offer Terms & Conditions</li>
                            <li>Return & Exchange Policy</li>
                            <li>Shipping Policy</li>
                            <li>Privacy Policy</li>
                            <li>Safety Checklist</li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6">
                    <div>
                        <p className="footer-heading ms-4">contact us</p>
                        <ul className="footer-ul">
                            <li>Customer Support</li>
                            <li>Store Locations</li>
                            <li>Help Center</li>
                        </ul>
                        <p className="footer-heading ms-4">about us</p>
                        <ul className="footer-ul">
                            <li>Official Brand Store</li>
                            <li>About Us</li>
                            <li>Careers</li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6">
                    <div>
                        <p className="footer-heading ms-4">social</p>
                        <ul className="footer-ul">
                            <li>Facebook</li>
                            <li>Twitter</li>
                            <li>YouTube</li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
