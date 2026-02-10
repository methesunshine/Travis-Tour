import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const [activeTab, setActiveTab] = useState('login');
    const [showPassword, setShowPassword] = useState(false);
    const [loginWithOTP, setLoginWithOTP] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Simple animation on mount
        const form = document.querySelector('.auth-card');
        if (form) {
            form.classList.add('fade-in');
        }
    }, [activeTab, isForgotPassword]);

    const handleLogin = (e) => {
        e.preventDefault();
        // Mock login
        navigate('/dashboard');
    };

    const handleRegister = (e) => {
        e.preventDefault();
        // Mock register
        setActiveTab('login');
        alert('Account created! Please login.');
    };

    return (
        <div className="auth-page">
            <div className="auth-split-layout">
                {/* Left Side: Illustration / Branding */}
                <div className="auth-visual-side" style={{ backgroundImage: "url('/auth-hero.png')" }}>
                    <div className="visual-overlay"></div>
                    <div className="visual-content">
                        <h1>Welcome Back to Travis Tours</h1>
                        <p>Login to manage your bookings and explore new adventures across Mumbai, Goa & Pune.</p>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="auth-form-side">
                    <div className="auth-card glassmorphism">
                        {!isForgotPassword ? (
                            <>
                                <div className="auth-tabs">
                                    <button
                                        className={activeTab === 'login' ? 'active' : ''}
                                        onClick={() => setActiveTab('login')}
                                    >Login</button>
                                    <button
                                        className={activeTab === 'register' ? 'active' : ''}
                                        onClick={() => setActiveTab('register')}
                                    >Register</button>
                                </div>

                                {activeTab === 'login' ? (
                                    <form className="auth-form" onSubmit={handleLogin}>
                                        <div className="form-group">
                                            <label>Email Address</label>
                                            <input type="email" placeholder="name@example.com" required />
                                        </div>

                                        <div className="form-group">
                                            <div className="label-row">
                                                <label>{loginWithOTP ? 'OTP' : 'Password'}</label>
                                                {!loginWithOTP && (
                                                    <span className="forgot-link" onClick={() => setIsForgotPassword(true)}>Forgot Password?</span>
                                                )}
                                            </div>
                                            <div className="password-input-wrapper">
                                                <input
                                                    type={showPassword || loginWithOTP ? 'text' : 'password'}
                                                    placeholder={loginWithOTP ? 'Enter 6-digit OTP' : 'Enter password'}
                                                    required
                                                />
                                                {!loginWithOTP && (
                                                    <button
                                                        type="button"
                                                        className="toggle-pwd"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                    >
                                                        {showPassword ? 'Hide' : 'Show'}
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        <div className="otp-toggle">
                                            <label className="switch">
                                                <input type="checkbox" checked={loginWithOTP} onChange={() => setLoginWithOTP(!loginWithOTP)} />
                                                <span className="slider round"></span>
                                            </label>
                                            <span>Login with OTP</span>
                                        </div>

                                        <button type="submit" className="btn btn-primary full-width large">Login</button>
                                        <p className="auth-footer">
                                            Don't have an account? <span onClick={() => setActiveTab('register')}>Register</span>
                                        </p>
                                    </form>
                                ) : (
                                    <form className="auth-form" onSubmit={handleRegister}>
                                        <div className="form-group">
                                            <label>Full Name</label>
                                            <input type="text" placeholder="John Doe" required />
                                        </div>
                                        <div className="form-group">
                                            <label>Email Address</label>
                                            <input type="email" placeholder="name@example.com" required />
                                        </div>
                                        <div className="form-group">
                                            <label>Phone Number</label>
                                            <input type="tel" placeholder="+91 XXXXX XXXXX" required />
                                        </div>
                                        <div className="form-grid">
                                            <div className="form-group">
                                                <label>Password</label>
                                                <input type="password" placeholder="••••••••" required />
                                            </div>
                                            <div className="form-group">
                                                <label>Confirm Password</label>
                                                <input type="password" placeholder="••••••••" required />
                                            </div>
                                        </div>
                                        <div className="terms-checkbox">
                                            <input type="checkbox" id="terms" required />
                                            <label htmlFor="terms">I agree to the Terms & Conditions</label>
                                        </div>
                                        <button type="submit" className="btn btn-primary full-width large">Create Account</button>
                                        <p className="auth-footer">
                                            Already have an account? <span onClick={() => setActiveTab('login')}>Login</span>
                                        </p>
                                    </form>
                                )}
                            </>
                        ) : (
                            <div className="forgot-password-flow">
                                <h3>Recover Password</h3>
                                <p className="subtitle">Enter your email to receive a reset OTP</p>
                                <form className="auth-form">
                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <input type="email" placeholder="name@example.com" required />
                                    </div>
                                    <button type="button" className="btn btn-outline full-width">Send OTP</button>

                                    <div className="form-group mt-20">
                                        <label>Verification OTP</label>
                                        <input type="text" placeholder="Enter OTP" />
                                    </div>
                                    <div className="form-group">
                                        <label>New Password</label>
                                        <input type="password" placeholder="••••••••" />
                                    </div>

                                    <button type="button" className="btn btn-primary full-width large" onClick={() => setIsForgotPassword(false)}>Reset Password</button>
                                    <span className="back-link" onClick={() => setIsForgotPassword(false)}>← Back to Login</span>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
