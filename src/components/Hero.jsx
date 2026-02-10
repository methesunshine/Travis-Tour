import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section id="home" className="hero-section" style={{ backgroundImage: "url('/india-hero.png')" }}>
            <div className="hero-overlay-dark"></div>
            <div className="hero-content fade-in">
                <span className="hero-subtitle">THE HEART OF INDIA</span>
                <h1>Discover Mumbai, Goa & Pune</h1>
                <p>Experience the ultimate luxury tour across India's most iconic western destinations.</p>
                <div className="hero-btns">
                    <Link to="/packages" className="btn btn-primary large">View Packages</Link>
                    <Link to="/about" className="btn btn-outline large">Our Story</Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;
