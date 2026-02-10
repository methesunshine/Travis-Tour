import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('bookings');
    const navigate = useNavigate();

    const menuItems = [
        { id: 'bookings', label: 'My Bookings', icon: '📅' },
        { id: 'profile', label: 'Profile', icon: '👤' },
        { id: 'payments', label: 'Payments', icon: '💳' },
    ];

    const bookings = [
        { id: 'BK-101', dest: 'Mumbai', package: 'Luxury Package', date: '2026-03-15', status: 'Confirmed', price: '₹1,20,000' },
        { id: 'BK-102', dest: 'Goa', package: 'Couple Package', date: '2026-04-10', status: 'Pending', price: '₹45,000' },
    ];

    return (
        <div className="dashboard-page">
            {/* Sidebar */}
            <aside className="dashboard-sidebar glassmorphism">
                <div className="sidebar-header">
                    <div className="user-avatar">AD</div>
                    <div className="user-info">
                        <h3>Ashvin D.</h3>
                        <span>Premium Member</span>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    {menuItems.map(item => (
                        <button
                            key={item.id}
                            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(item.id)}
                        >
                            <span className="nav-icon">{item.icon}</span>
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <button className="logout-btn" onClick={() => navigate('/login')}>
                        <span className="nav-icon">🚪</span> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="dashboard-main">
                <div className="dashboard-header">
                    <h1>Welcome, Ashvin</h1>
                    <p>Track your trips and manage your account details.</p>
                </div>

                {activeTab === 'bookings' && (
                    <div className="dashboard-section fade-up">
                        <div className="section-title-row">
                            <h2>My Bookings</h2>
                            <button className="btn btn-primary small">New Booking</button>
                        </div>
                        <div className="booking-grid">
                            {bookings.map(book => (
                                <div key={book.id} className="dashboard-card glassmorphism">
                                    <div className="card-header">
                                        <span className="booking-id">{book.id}</span>
                                        <span className={`status-badge ${book.status.toLowerCase()}`}>{book.status}</span>
                                    </div>
                                    <div className="card-body">
                                        <h3>{book.dest}</h3>
                                        <p className="package-name">{book.package}</p>
                                        <div className="card-details">
                                            <span>📅 {book.date}</span>
                                            <span className="price">{book.price}</span>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <button className="btn btn-outline small">View Details</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'profile' && (
                    <div className="dashboard-section fade-up">
                        <h2>Profile Settings</h2>
                        <div className="dashboard-card glassmorphism profile-settings">
                            <div className="profile-grid">
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input type="text" defaultValue="Ashvin D." />
                                </div>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input type="email" defaultValue="ashvin@example.com" />
                                </div>
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input type="tel" defaultValue="+91 98765 43210" />
                                </div>
                                <div className="form-group">
                                    <label>Location</label>
                                    <input type="text" defaultValue="Mumbai, India" />
                                </div>
                            </div>
                            <button className="btn btn-primary">Update Profile</button>
                        </div>
                    </div>
                )}

                {activeTab === 'payments' && (
                    <div className="dashboard-section fade-up">
                        <h2>Payment History</h2>
                        <div className="dashboard-card glassmorphism no-padding overflow-hidden">
                            <table className="dashboard-table">
                                <thead>
                                    <tr>
                                        <th>Transaction ID</th>
                                        <th>Date</th>
                                        <th>Amount</th>
                                        <th>Method</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>#TXN7789</td>
                                        <td>2026-01-20</td>
                                        <td>₹1,20,000</td>
                                        <td>UPI / Card</td>
                                        <td><span className="status-badge confirmed">Success</span></td>
                                    </tr>
                                    <tr>
                                        <td>#TXN7742</td>
                                        <td>2025-12-15</td>
                                        <td>₹45,000</td>
                                        <td>Net Banking</td>
                                        <td><span className="status-badge confirmed">Success</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
