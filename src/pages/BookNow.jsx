import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const BookNow = () => {
    const location = useLocation();
    const initialDestination = location.state?.destination || 'Mumbai';
    const initialPackage = location.state?.packageType || 'Luxury Package';

    const [bookingDetails, setBookingDetails] = useState({
        destination: initialDestination,
        packageType: initialPackage,
        date: '',
        travelers: 1,
        payment: 'Pay Online'
    });

    const prices = {
        'Budget Package': 25000,
        'Couple Package': 45000,
        'Family Package': 85000,
        'Luxury Package': 120000
    };

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
        setBookingDetails(prev => ({ ...prev, [name]: value }));
    };

    const updateTravelers = (amount) => {
        setBookingDetails(prev => ({
            ...prev,
            travelers: Math.max(1, prev.travelers + amount)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Booking Initialized for ${bookingDetails.destination}!\nTotal Amount: ₹${(prices[bookingDetails.packageType] * bookingDetails.travelers).toLocaleString()}`);
    };

    return (
        <div className="book-page">
            {/* Hero Section */}
            <section className="book-hero" style={{ backgroundImage: "url('/booking-hero.png')" }}>
                <div className="hero-overlay-dark"></div>
                <div className="hero-content fade-in">
                    <span className="hero-subtitle">TRAVIS TOURS</span>
                    <h1>Complete Your Booking</h1>
                </div>
            </section>

            {/* Main Booking Content */}
            <section className="home-section container">
                <div className="booking-layout">
                    {/* Left: Booking Form */}
                    <div className="booking-form-wrapper animate-on-scroll fade-up">
                        <div className="booking-card">
                            <form onSubmit={handleSubmit} className="premium-form">
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>📍 Destination</label>
                                        <select name="destination" value={bookingDetails.destination} onChange={handleChange} required>
                                            <option value="Mumbai">Mumbai</option>
                                            <option value="Goa">Goa</option>
                                            <option value="Pune">Pune</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>📦 Package Selection</label>
                                        <select name="packageType" value={bookingDetails.packageType} onChange={handleChange} required>
                                            <option value="Budget Package">Budget Package</option>
                                            <option value="Couple Package">Couple Package</option>
                                            <option value="Family Package">Family Package</option>
                                            <option value="Luxury Package">Luxury Package</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>📅 Travel Date</label>
                                        <input type="date" name="date" value={bookingDetails.date} onChange={handleChange} required />
                                    </div>

                                    <div className="form-group">
                                        <label>👥 Number of Travelers</label>
                                        <div className="traveler-controls">
                                            <button type="button" onClick={() => updateTravelers(-1)} disabled={bookingDetails.travelers <= 1}>-</button>
                                            <input type="number" value={bookingDetails.travelers} readOnly />
                                            <button type="button" onClick={() => updateTravelers(1)}>+</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group payment-group">
                                    <label>💳 Payment Option</label>
                                    <div className="payment-options">
                                        <label className="radio-label">
                                            <input type="radio" name="payment" value="Pay Online" checked={bookingDetails.payment === 'Pay Online'} onChange={handleChange} />
                                            <span>Pay Online</span>
                                        </label>
                                        <label className="radio-label">
                                            <input type="radio" name="payment" value="Pay Later" checked={bookingDetails.payment === 'Pay Later'} onChange={handleChange} />
                                            <span>Pay Later</span>
                                        </label>
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-primary large full-width">Confirm Booking</button>
                                <p className="trust-text">🔒 Your information is secure and protected.</p>
                            </form>
                        </div>
                    </div>

                    {/* Right: Booking Summary (Desktop) */}
                    <div className="booking-summary-wrapper animate-on-scroll fade-up">
                        <div className="summary-card">
                            <h3>Booking Summary</h3>
                            <div className="summary-details">
                                <div className="summary-item">
                                    <span>Destination:</span>
                                    <strong>{bookingDetails.destination}</strong>
                                </div>
                                <div className="summary-item">
                                    <span>Package:</span>
                                    <strong>{bookingDetails.packageType}</strong>
                                </div>
                                <div className="summary-item">
                                    <span>Travelers:</span>
                                    <strong>{bookingDetails.travelers} Person(s)</strong>
                                </div>
                                <div className="summary-divider"></div>
                                <div className="summary-total">
                                    <span>Estimated Price:</span>
                                    <strong className="total-amount">₹{(prices[bookingDetails.packageType] * bookingDetails.travelers).toLocaleString()}</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BookNow;
