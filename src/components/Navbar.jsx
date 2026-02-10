import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <header className={scrolled ? 'scrolled' : ''}>
            <nav className="navbar">
                <NavLink to="/" className="logo" onClick={closeMobileMenu}>
                    <img src="/logo.png" alt="Travel Tour Logo" />
                </NavLink>

                <ul className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                    <li><NavLink to="/" onClick={closeMobileMenu}>Home</NavLink></li>
                    <li><NavLink to="/packages" onClick={closeMobileMenu}>Packages</NavLink></li>
                    <li><NavLink to="/services" onClick={closeMobileMenu}>Services</NavLink></li>
                    <li><NavLink to="/about" onClick={closeMobileMenu}>About Us</NavLink></li>
                    <li><NavLink to="/contact" onClick={closeMobileMenu}>Contact</NavLink></li>
                </ul>

                <div className="nav-actions">
                    <NavLink to="/login" className="btn btn-outline" onClick={closeMobileMenu}>Login / Register</NavLink>
                    <NavLink to="/book" className="btn btn-primary" onClick={closeMobileMenu}>Book Now</NavLink>
                </div>

                <div
                    className={`mobile-menu-btn ${mobileMenuOpen ? 'open' : ''}`}
                    onClick={toggleMobileMenu}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
