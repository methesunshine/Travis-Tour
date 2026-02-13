import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';

const Home = () => {
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

    const featuredDestinations = [
        {
            title: 'MUMBAI',
            duration: '2 Days',
            country: 'MAHARASHTRA',
            image: '/mumbai-card.png',
            desc: 'The city of dreams, where history meets modern luxury.'
        },
        {
            title: 'GOA',
            duration: '7 Days',
            country: 'COASTAL INDIA',
            image: '/goa-card.png',
            desc: 'Pristine beaches and elite tropical retreats.'
        },
        {
            title: 'PUNE',
            duration: '4 Days',
            country: 'SAHYADRI RANGES',
            image: '/pune-card.png',
            desc: 'Lush greenery and heritage hilltop escapes.'
        }
    ];

    return (
        <div className="home-page">
            <Hero />

            {/* Featured Destinations */}
            <section className="home-section container">
                <div className="section-header animate-on-scroll fade-up">
                    <span className="subtitle">INDIAN TREASURES</span>
                    <h2 className="section-title">FEATURED CITIES</h2>
                </div>

                <div className="destinations-grid">
                    {featuredDestinations.map((dest, index) => (
                        <div key={index} className="dest-card animate-on-scroll fade-up">
                            <div className="dest-image" style={{ backgroundImage: `url(${dest.image})` }}>
                                <div className="dest-overlay">
                                    <div className="dest-badge-row">
                                        <span className="dest-country">{dest.country}</span>
                                        <span className="dest-duration">🕐 {dest.duration}</span>
                                    </div>
                                    <h3>{dest.title}</h3>
                                    <p>{dest.desc}</p>
                                    <Link to="/packages" className="btn-text">View Packages →</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Why Travel With Us */}
            <section className="home-section bg-dark-alt">
                <div className="container">
                    <div className="section-header animate-on-scroll fade-up">
                        <span className="subtitle">LOCAL EXPERTISE</span>
                        <h2 className="section-title">THE INDIA TOUR PROMISE</h2>
                    </div>

                    <div className="features-grid">
                        <div className="feature-item animate-on-scroll fade-up">
                            <div className="feature-icon">🏨</div>
                            <h3>Regal Stays</h3>
                            <p>Premium hotels and heritage resorts in Mumbai, Goa, and Pune.</p>
                        </div>
                        <div className="feature-item animate-on-scroll fade-up">
                            <div className="feature-icon">🚗</div>
                            <h3>Seamless Travel</h3>
                            <p>Private luxury transfers across the western heartland of India.</p>
                        </div>
                        <div className="feature-item animate-on-scroll fade-up">
                            <div className="feature-icon">💎</div>
                            <h3>Localized Care</h3>
                            <p>Expert local guides and 24/7 concierge for a personalized experience.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
