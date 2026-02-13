import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const packageData = [
    // Mumbai Packages
    {
        id: 'm1',
        city: 'Mumbai',
        duration: '2 Days',
        image: '/mumbai-card.png',
        type: 'Budget',
        title: 'Mumbai Budget Explorer',
        price: '₹25,000',
        includes: ['2★ / 3★ Hotel', 'Breakfast only', 'Shared AC transport', 'Group sightseeing'],
        bestFor: 'Students & budget travelers',
        icon: '🎒'
    },
    {
        id: 'm2',
        city: 'Mumbai',
        duration: '2 Days',
        image: '/mumbai-card.png',
        type: 'Couple',
        title: 'Mumbai Romantic Escape',
        price: '₹45,000',
        includes: ['3★ / 4★ Hotel', 'Private cab', 'Candlelight dinner (optional)'],
        bestFor: 'Couples',
        icon: '💑'
    },
    {
        id: 'm3',
        city: 'Mumbai',
        duration: '2 Days',
        image: '/mumbai-card.png',
        type: 'Family',
        title: 'Mumbai Family Fun',
        price: '₹85,000',
        includes: ['Family-friendly hotel', 'Breakfast + Dinner', 'Guided sightseeing', 'Spacious AC vehicle'],
        bestFor: 'Families',
        icon: '👨‍👩‍👧‍👦'
    },
    {
        id: 'm4',
        city: 'Mumbai',
        duration: '2 Days',
        image: '/mumbai-card.png',
        type: 'Luxury',
        title: 'Mumbai Royal Grandeur',
        price: '₹1,20,000',
        includes: ['4★ / 5★ Hotel', 'All meals', 'Private chauffeur'],
        bestFor: 'Premium travelers',
        icon: '👑'
    },
    // Goa Packages
    {
        id: 'g1',
        city: 'Goa',
        duration: '7 Days',
        image: '/goa-card.png',
        type: 'Budget',
        title: 'Goa Beach Backpacker',
        price: '₹25,000',
        includes: ['2★ / 3★ Hotel', 'Breakfast only', 'Shared AC transport', 'Group sightseeing'],
        bestFor: 'Budget travelers',
        icon: '🏖️'
    },
    {
        id: 'g2',
        city: 'Goa',
        duration: '7 Days',
        image: '/goa-card.png',
        type: 'Couple',
        title: 'Goa Honeymoon Bliss',
        price: '₹45,000',
        includes: ['3★ / 4★ Resort', 'Private cab', 'Candlelight dinner (optional)', 'Beach-view hotel (optional)'],
        bestFor: 'Couples & honeymoon',
        icon: '💖'
    },
    {
        id: 'g3',
        city: 'Goa',
        duration: '7 Days',
        image: '/goa-card.png',
        type: 'Family',
        title: 'Goa Family Retreat',
        price: '₹85,000',
        includes: ['Family-friendly resort', 'Breakfast + Dinner', 'Guided sightseeing', 'Spacious AC vehicle'],
        bestFor: 'Families',
        icon: '👨‍👩‍👧‍👦'
    },
    {
        id: 'g4',
        city: 'Goa',
        duration: '7 Days',
        image: '/goa-card.png',
        type: 'Luxury',
        title: 'Goa Elite Coastal',
        price: '₹1,20,000',
        includes: ['4★ / 5★ Resort', 'All meals', 'Private chauffeur', 'Cruise dinner (optional)'],
        bestFor: 'Premium travelers',
        icon: '🍾'
    },
    // Pune Packages
    {
        id: 'p1',
        city: 'Pune',
        duration: '4 Days',
        image: '/pune-card.png',
        type: 'Budget',
        title: 'Pune Heritage Budget',
        price: '₹25,000',
        includes: ['2★ / 3★ Hotel', 'Breakfast only', 'Shared AC transport', 'Group sightseeing'],
        bestFor: 'Students & budget travelers',
        icon: '🏛️'
    },
    {
        id: 'p2',
        city: 'Pune',
        duration: '4 Days',
        image: '/pune-card.png',
        type: 'Couple',
        title: 'Pune Hilltop Retreat',
        price: '₹45,000',
        includes: ['3★ / 4★ Hotel', 'Private cab', 'Candlelight dinner (optional)'],
        bestFor: 'Couples',
        icon: '⛰️'
    },
    {
        id: 'p3',
        city: 'Pune',
        duration: '4 Days',
        image: '/pune-card.png',
        type: 'Family',
        title: 'Pune Family Getaway',
        price: '₹85,000',
        includes: ['Family-friendly hotel', 'Breakfast + Dinner', 'Guided sightseeing', 'Spacious AC vehicle'],
        bestFor: 'Families',
        icon: '🚐'
    },
    {
        id: 'p4',
        city: 'Pune',
        duration: '4 Days',
        image: '/pune-card.png',
        type: 'Luxury',
        title: 'Pune Signature Luxury',
        price: '₹1,20,000',
        includes: ['4★ / 5★ Hotel', 'All meals', 'Private chauffeur'],
        bestFor: 'Premium travelers',
        icon: '🌟'
    }
];

const Packages = () => {
    const [filter, setFilter] = useState('All');

    const filteredPackages = filter === 'All'
        ? packageData
        : packageData.filter(pkg => pkg.type === filter);

    const cities = ['Mumbai', 'Goa', 'Pune'];

    return (
        <div className="packages-page">
            {/* Hero Section */}
            <section className="packages-hero" style={{ backgroundImage: "url('/packages-hero.png')" }}>
                <div className="hero-overlay"></div>
                <div className="hero-content fade-in">
                    <h1>Our Travel Packages</h1>
                    <p>Choose the perfect experience for Mumbai, Goa & Pune</p>
                </div>
            </section>

            {/* Filter Section */}
            <div className="filter-container container">
                <div className="filter-bar">
                    {['All', 'Budget', 'Couple', 'Family', 'Luxury'].map(type => (
                        <button
                            key={type}
                            className={`filter-btn ${filter === type ? 'active' : ''}`}
                            onClick={() => setFilter(type)}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            {/* Packages Grid */}
            <div className="packages-container container">
                {cities.map(city => {
                    const cityPackages = filteredPackages.filter(pkg => pkg.city === city);
                    if (cityPackages.length === 0) return null;

                    return (
                        <section key={city} className="city-section">
                            <h2 className="city-title">{city.toUpperCase()} PACKAGES</h2>
                            <div className="packages-grid">
                                {cityPackages.map(pkg => (
                                    <div key={pkg.id} className={`package-card ${pkg.type === 'Luxury' ? 'luxury-highlight' : ''}`}>
                                        <div className="package-card-image" style={{ backgroundImage: `url(${pkg.image})` }}>
                                            <div className="package-type-badge">{pkg.type}</div>
                                        </div>
                                        <div className="package-card-content">
                                            <div className="package-icon-small">{pkg.icon}</div>
                                            <h3>{pkg.title}</h3>
                                            <div className="package-price-row">
                                                <div className="package-price">{pkg.price}</div>
                                                <div className="package-duration">🕐 {pkg.duration}</div>
                                            </div>
                                            <div className="package-meta">Best for: {pkg.bestFor}</div>
                                            <ul className="package-includes">
                                                {pkg.includes.map((item, index) => (
                                                    <li key={index}>
                                                        <span className="include-icon">
                                                            {item.includes('Hotel') || item.includes('Resort') ? '🏨' :
                                                                item.includes('Breakfast') || item.includes('meals') ? '🍽️' :
                                                                    item.includes('transport') || item.includes('cab') || item.includes('vehicle') || item.includes('chauffeur') ? '🚗' :
                                                                        '🗺️'}
                                                        </span>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                            <Link
                                                to="/book"
                                                state={{
                                                    destination: pkg.city,
                                                    packageType: `${pkg.type} Package`
                                                }}
                                                className="btn btn-primary full-width text-center"
                                                style={{ display: 'block' }}
                                            >
                                                Book Now
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    );
                })}
            </div>
        </div>
    );
};

export default Packages;
