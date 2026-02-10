import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer-section">
            <div className="footer-top-gradient"></div>
            <div className="container footer-grid">
                {/* Column 1: Logo + About */}
                <div className="footer-col about-col">
                    <img src="/logo.png" alt="Travis Tours Logo" className="footer-logo" />
                    <p className="footer-about-text">
                        Travis Tours offers curated travel experiences in Mumbai, Goa, and Pune. We create unforgettable journeys with comfort, safety, and premium service.
                    </p>
                </div>

                {/* Column 2: Quick Links */}
                <div className="footer-col">
                    <h3>Quick Links</h3>
                    <ul className="footer-links">
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/packages">Packages</NavLink></li>
                        <li><NavLink to="/services">Services</NavLink></li>
                        <li><NavLink to="/about">About Us</NavLink></li>
                        <li><NavLink to="/contact">Contact</NavLink></li>
                    </ul>
                </div>

                {/* Column 3: Services */}
                <div className="footer-col">
                    <h3>Our Services</h3>
                    <ul className="footer-links services-links">
                        <li><span>✈️</span> Flight Booking</li>
                        <li><span>🏨</span> Hotel Booking</li>
                        <li><span>🚗</span> Transport</li>
                        <li><span>🗺️</span> Tour Guide</li>
                        <li><span>🛡️</span> Travel Insurance</li>
                    </ul>
                </div>

                {/* Column 4: Policies */}
                <div className="footer-col">
                    <h3>Policies</h3>
                    <ul className="footer-links">
                        <li><NavLink to="/privacy">Privacy Policy</NavLink></li>
                        <li><NavLink to="/terms">Terms & Conditions</NavLink></li>
                    </ul>
                </div>

                {/* Column 5: Contact Info */}
                <div className="footer-col">
                    <h3>Contact Us</h3>
                    <ul className="footer-contact">
                        <li><span className="icon">📍</span> Mumbai, India</li>
                        <li><span className="icon">📧</span> info@travistours.com</li>
                        <li><span className="icon">📞</span> +91-XXXXXXXXXX</li>
                    </ul>
                </div>
            </div>

            {/* Social Media Section */}
            <div className="footer-social-section">
                <div className="social-icons">
                    <a href="#" className="social-icon">Instagram</a>
                    <a href="#" className="social-icon">Facebook</a>
                    <a href="#" className="social-icon">Twitter</a>
                    <a href="#" className="social-icon">WhatsApp</a>
                </div>
            </div>

            {/* Bottom Copyright Bar */}
            <div className="footer-bottom">
                <div className="container">
                    <div className="footer-divider"></div>
                    <p className="copyright-text">© 2026 Travis Tours. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
