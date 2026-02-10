import React from 'react';

const PagePlaceholder = ({ title }) => {
    return (
        <div style={{ padding: '150px 20px', textAlign: 'center', minHeight: '80vh' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '20px', fontFamily: 'Montserrat' }}>{title}</h1>
            <p style={{ fontSize: '1.2rem', color: '#888' }}>This page is coming soon. Stay tuned for incredible travel experiences!</p>
        </div>
    );
};

export const Services = () => <PagePlaceholder title="Travel Services" />;
export const Contact = () => <PagePlaceholder title="Contact Us" />;
