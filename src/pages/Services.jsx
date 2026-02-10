import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
    useEffect(() => {
        const handleScroll = () => {
            const elements = document.querySelectorAll('.animate-on-scroll');
            elements.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight - 100) {
                    el.classList.add('visible');
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const serviceList = [
        {
            title: 'Flight Booking',
            icon: '✈️',
            desc: 'Affordable domestic and international flight bookings with flexible options and best price guarantee.'
        },
        {
            title: 'Hotel Booking',
            icon: '🏨',
            desc: 'Comfortable 2★ to 5★ stays, handpicked hotels and resorts for a relaxing experience.'
        },
        {
            title: 'Transport',
            icon: '🚗',
            desc: 'Safe and reliable AC transport with private cabs and group travel options.'
        },
        {
            title: 'Tour Guide',
            icon: '🗺️',
            desc: 'Experienced local guides to help you explore Mumbai, Goa, and Pune with insider knowledge.'
        },
        {
            title: 'Travel Insurance',
            icon: '🛡️',
            desc: 'Secure your journey with comprehensive travel insurance coverage for peace of mind.'
        }
    ];

    return (
        <div className="services-page">
            {/* Hero Section */}
            <section className="services-hero" style={{ backgroundImage: "url('/services-hero.png')" }}>
                <div className="hero-overlay-dark"></div>
                <div className="hero-content fade-in">
                    <span className="hero-subtitle">PREMIUM TRAVEL SOLUTIONS</span>
                    <h1>Our Services</h1>
                    <p>Everything you need for a smooth and unforgettable journey</p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="home-section container">
                <div className="services-grid">
                    {serviceList.map((service, index) => (
                        <div key={index} className="service-card animate-on-scroll fade-up">
                            <div className="service-icon-wrapper">
                                <span className="service-icon">{service.icon}</span>
                            </div>
                            <h3>{service.title}</h3>
                            <p>{service.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Call to Action */}
            <section className="home-section bg-dark-alt">
                <div className="container text-center">
                    <div className="section-header animate-on-scroll fade-up" style={{ marginBottom: '40px' }}>
                        <span className="subtitle">START YOUR ADVENTURE</span>
                        <h2 className="section-title">READY TO PLAN YOUR TRIP?</h2>
                    </div>
                    <div className="hero-btns animate-on-scroll fade-up">
                        <Link to="/book" className="btn btn-primary large">Book Now</Link>
                        <Link to="/contact" className="btn btn-outline large">Contact Us</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services;
