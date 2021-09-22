import { faFacebook, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useHistory } from 'react-router';
import "./homeStyles.css"

const Footer = () => {
    const history = useHistory()
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
                            <li onClick={() => history.push("/terms")}>Terms & Conditions</li>
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
                            <li onClick={() => history.push("/contactus")}>Contact Us</li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-3 col-sm-6">
                    <div>
                        <p className="footer-heading ms-4">social</p>
                        <ul className="footer-ul">
                            <li><FontAwesomeIcon icon={faFacebook} /> Facebook</li>
                            <li><FontAwesomeIcon icon={faTwitter} /> Twitter</li>
                            <li><FontAwesomeIcon icon={faYoutube} /> YouTube</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="text-center mt-5 border-top border-bottom w-75 mx-auto text-mute">
                Address: SR Ecommerce Factory Pvt. Ltd., 2/14, ground floor , Ansari road , Daryaganj Delhi 110002 | Email: customerservice@bookworm.com| Phone: 011-41521153
            </div>
            <div className="text-center mt-4 pb-5">
                Copyright 2021, Bookworm.com. All Rights Reserved
            </div>
        </footer>
    );
}

export default Footer;
