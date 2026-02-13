import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';

const Contact = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

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
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase
                .from('contact_submissions')
                .insert([{
                    full_name: formData.fullName,
                    email: formData.email,
                    phone: formData.phone,
                    message: formData.message
                }]);

            if (error) throw error;

            alert('Thank you for contacting Travis Tours! Your message has been saved.');
            setFormData({ fullName: '', email: '', phone: '', message: '' });
        } catch (error) {
            console.error('Error saving message:', error);
            alert('Error sending message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contact-page">
            {/* Hero Section */}
            <section className="contact-hero" style={{ backgroundImage: "url('/contact-hero.png')" }}>
                <div className="hero-overlay-dark"></div>
                <div className="hero-content fade-in">
                    <span className="hero-subtitle">TRAVIS TOURS</span>
                    <h1>Get In Touch</h1>
                    <p>We're here to help you plan your perfect trip to Mumbai, Goa & Pune</p>
                </div>
            </section>

            {/* Contact Section */}
            <section className="home-section container">
                <div className="contact-container">
                    {/* Left Side: Contact Info */}
                    <div className="contact-info animate-on-scroll fade-up">
                        <div className="section-header">
                            <span className="subtitle">CONTACT DETAILS</span>
                            <h2 className="section-title">Connect With Us</h2>
                        </div>

                        <div className="info-items">
                            <div className="info-item">
                                <div className="info-icon">📍</div>
                                <div className="info-text">
                                    <h4>Address</h4>
                                    <p>Your office address here, Mumbai, India</p>
                                </div>
                            </div>

                            <div className="info-item">
                                <div className="info-icon">📧</div>
                                <div className="info-text">
                                    <h4>Email</h4>
                                    <p>info@travistours.com</p>
                                </div>
                            </div>

                            <div className="info-item">
                                <div className="info-icon">📞</div>
                                <div className="info-text">
                                    <h4>Phone</h4>
                                    <p>+91-XXXXXXXXXX</p>
                                </div>
                            </div>
                        </div>

                        <div className="social-links-contact">
                            <a href="#" className="social-icon-btn">Instagram</a>
                            <a href="#" className="social-icon-btn">Facebook</a>
                            <a href="#" className="social-icon-btn">WhatsApp</a>
                        </div>
                    </div>

                    {/* Right Side: Contact Form */}
                    <div className="contact-form-card animate-on-scroll fade-up">
                        <form onSubmit={handleSubmit} className="premium-form">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Enter phone number"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="5"
                                    placeholder="How can we help you?"
                                    required
                                ></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary large full-width" disabled={loading}>
                                {loading ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Embedded Map */}
            <section className="home-section no-padding">
                <div className="map-container animate-on-scroll">
                    <iframe
                        title="Mumbai Office"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120663.74312015024!2d72.8257642!3d19.076090!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </div>
            </section>
        </div>
    );
};

export default Contact;
