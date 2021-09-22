
const ContactUs = () => {
    return (
        <>
            <div className="container mt-5 text-center">
                {/* Form */}
                <h1 className="text-uppercase">take the first step</h1>
                <p>We would love to hear from you.</p>
                <p><strong>Please fill up the form below to send us a message. We will contact you very soon.</strong></p>
                <form className="mx-auto mt-5 ps-5 pe-5" action="#">
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" name="name" id="name" placeholder="#" />
                                <label htmlFor="name">NAME*</label>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="form-floating mb-3">
                                <input type="email" className="form-control" name="email" id="email" placeholder="#" />
                                <label htmlFor="email">EMAIL*</label>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="form-floating mb-3 organization">
                                <input type="text" className="form-control" name="organization" id="organization" placeholder="#" />
                                <label htmlFor="phone">PHONE*</label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" name="contact" id="contact" placeholder="#" />
                                <label htmlFor="subject">SUBJECT*</label>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="form-floating">
                                <select className="form-select" id="region">
                                    <option value="" defaultChecked>REGION*</option>
                                    <option value="India">India</option>
                                    <option value="North America">North America</option>
                                    <option value="South America">South America</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="form-floating inquiry">
                                <select className="form-select" id="inquiry">
                                    <option value="" defaultChecked>ISSUE TYPE*</option>
                                    <option value="Payment Related">Payment Related</option>
                                    <option value="Order Related">Order Related</option>
                                    <option value="Business Related">Business Related</option>
                                    <option value="Authors/Publishers Related">Authors/Publishers Related</option>
                                    <option value="Any Other">Any Other</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-floating mb-3">
                                <textarea className="form-control" placeholder="#" id="message"></textarea>
                                <label htmlFor="message" className="ps-4">DESCRIPTION</label>
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-danger text-uppercase d-flex mx-auto mt-4"><strong>submit</strong><i
                        className="bi bi-caret-right caret-white"></i></button>
                </form>
            </div>
        </>
    );
}

export default ContactUs;
