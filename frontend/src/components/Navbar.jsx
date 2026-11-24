
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark sticky-top">

            <Link className="navbar-brand" to="/">
                <img
                    src="/assets/logo.png"
                    height="70"
                    alt="Shubhra Gold Buyers"
                />
            </Link>

            <button
                className="navbar-toggler"
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>

                <ul className="navbar-nav mx-auto">

                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/about">About</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/services">Services</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/branches">Branches</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/blog">Blog</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/contact">Contact</Link>
                    </li>

                </ul>

                <Link
                    to="/contact"
                    className="btn btn-gold"
                    onClick={() => setMenuOpen(false)}
                >
                    Book Now
                </Link>

            </div>

        </nav>
    );
}

export default Navbar;
