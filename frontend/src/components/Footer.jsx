
import React from "react";
import { Link } from "react-router-dom";

function Footer() {

    return (
        <footer className="text-white py-5"
            style={{ background: "#350e0e" }}>

            <div className="container">

                <div className="row">

                    <div className="col-md-4 mb-4">
                        <img
                            src="/assets/logo.png"
                            height="65"
                            alt="Shubhra Gold Buyers"
                        />

                        <p className="mt-3">
                            Trusted Gold Buying Services.
                            Get transparent gold valuation
                            and professional assistance.
                        </p>
                    </div>

                    <div className="col-md-4 mb-4">
                        <h5>Quick Links</h5>

                        <ul className="list-unstyled">
                            <li><Link to="/" className="text-white">Home</Link></li>
                            <li><Link to="/about" className="text-white">About</Link></li>
                            <li><Link to="/services" className="text-white">Services</Link></li>
                            <li><Link to="/branches" className="text-white">Branches</Link></li>
                            <li><Link to="/contact" className="text-white">Contact</Link></li>
                        </ul>
                    </div>

                    <div className="col-md-4 mb-4">
                        <h5>Contact Us</h5>

                        <p>
                            <i className="bi bi-envelope"></i>
                            {" "}shubhragoldbuyers@gmail.com
                        </p>

                        <p>
                            <i className="bi bi-telephone"></i>
                            {" "}+91 8010683134
                        </p>
                    </div>

                </div>

                <hr />

                <p className="text-center mb-0">
                    © {new Date().getFullYear()} Shubhra Gold Buyers.
                    All Rights Reserved.
                </p>

            </div>

        </footer>
    );
}

export default Footer;
