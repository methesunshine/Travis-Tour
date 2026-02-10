import React, { useEffect } from 'react';

const About = () => {
    useEffect(() => {
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="about-hero" style={{ backgroundImage: "url('/about-hero.png')" }}>
                <div className="hero-overlay"></div>
                <div className="hero-content fade-in">
                    <h1>About Our Journey</h1>
                    <p>Crafting unforgettable experiences in Mumbai, Goa & Pune</p>
                </div>
            </section>

            {/* Story Section */}
            <section className="about-section story-section container">
                <div className="about-grid">
                    <div className="about-text animate-on-scroll slide-right">
                        <h2 className="section-title">Our Story</h2>
                        <p>
                            Started with a vision to redefine travel in Western India, our journey began with a simple passion: to showcase the hidden gems and vibrant cultures of Mumbai, Goa, and Pune. We believe that travel is more than just visiting a place; it's about the stories you bring home.
                        </p>
                        <p>
                            With our deep local expertise and a focus on premium, curated experiences, we have grown into a trusted travel partner. Our commitment to quality ensures that every tour we plan is as unique and memorable as the destinations themselves.
                        </p>
                    </div>
                    <div className="about-image animate-on-scroll slide-left">
                        <img src="/story.png" alt="Our Travel Story" className="rounded-image shadow" />
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="about-section mission-section bg-light">
                <div className="container about-grid reverse">
                    <div className="about-image animate-on-scroll slide-right">
                        <img src="/mission.png" alt="Our Mission" className="rounded-image shadow" />
                    </div>
                    <div className="about-text animate-on-scroll slide-left">
                        <h2 className="section-title">Our Mission</h2>
                        <p>
                            Our mission is to provide affordable yet premium travel experiences that prioritize customer satisfaction and safety. We strive to be the bridge between travelers and the authentic soul of India, offering reliable and meticulously planned tours.
                        </p>
                        <ul className="mission-list">
                            <li>Premium & Affordable Tours</li>
                            <li>Unmatched Customer Satisfaction</li>
                            <li>Safe & Reliable Planning</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Vision Section */}
            <section className="about-section vision-section container">
                <div className="about-grid">
                    <div className="about-text animate-on-scroll slide-right">
                        <h2 className="section-title">Our Vision</h2>
                        <p>
                            We envision becoming the most trusted travel brand in India, known for delivering curated experiences that inspire and connect. As we expand, our goal remains the same: to deliver memorable journeys that leave a lasting impact on our travelers.
                        </p>
                    </div>
                    <div className="about-image animate-on-scroll slide-left">
                        <img src="/vision.png" alt="Our Vision" className="rounded-image shadow" />
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="about-section why-choose-us bg-dark text-white">
                <div className="container text-center">
                    <h2 className="section-title">Why Choose Us</h2>
                    <div className="features-grid">
                        <div className="feature-item animate-on-scroll fade-up">
                            <div className="feature-icon">📍</div>
                            <h3>Local Expertise</h3>
                            <p>Deep knowledge of Mumbai, Goa, and Pune.</p>
                        </div>
                        <div className="feature-item animate-on-scroll fade-up" style={{ transitionDelay: '0.1s' }}>
                            <div className="feature-icon">✨</div>
                            <h3>Personalized Packages</h3>
                            <p>Tours tailored to your unique preferences.</p>
                        </div>
                        <div className="feature-item animate-on-scroll fade-up" style={{ transitionDelay: '0.2s' }}>
                            <div className="feature-icon">💎</div>
                            <h3>Transparent Pricing</h3>
                            <p>No hidden costs, just premium value.</p>
                        </div>
                        <div className="feature-item animate-on-scroll fade-up" style={{ transitionDelay: '0.3s' }}>
                            <div className="feature-icon">📞</div>
                            <h3>24/7 Support</h3>
                            <p>We're with you every step of your journey.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
