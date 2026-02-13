import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabase';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('bookings');
    const { user, signOut } = useAuth();
    const [userBookings, setUserBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showVoucher, setShowVoucher] = useState(false);
    const navigate = useNavigate();

    const menuItems = [
        { id: 'bookings', label: 'My Bookings', icon: '📅' },
        { id: 'profile', label: 'Profile', icon: '👤' },
        { id: 'payments', label: 'Payments', icon: '💳' },
    ];

    useEffect(() => {
        if (user) {
            fetchBookings();
        }
    }, [user]);

    const fetchBookings = async () => {
        try {
            const { data, error } = await supabase
                .from('bookings')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setUserBookings(data || []);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    // Get initials for avatar
    const getInitials = () => {
        if (!user?.user_metadata?.full_name) return 'U';
        return user.user_metadata.full_name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    };

    const handleAvatarUpload = async (event) => {
        try {
            setUploading(true);

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.');
            }

            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${user.id}/${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            // 1. Upload to Storage
            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // 2. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('avatars')
                .getPublicUrl(filePath);

            // 3. Update Auth Metadata
            const { error: updateError } = await supabase.auth.updateUser({
                data: { avatar_url: publicUrl }
            });

            if (updateError) throw updateError;

            alert('Profile picture updated successfully!');
            // Refresh logic - the user object in AuthContext will update via onAuthStateChange
        } catch (error) {
            alert(error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleViewVoucher = (booking) => {
        setSelectedBooking(booking);
        setShowVoucher(true);
    };

    const handlePrint = () => {
        window.print();
    };

    const VoucherModal = ({ booking, onClose }) => {
        if (!booking) return null;

        return (
            <div className="voucher-overlay" onClick={onClose}>
                <div className="voucher-modal" onClick={e => e.stopPropagation()}>
                    <div className="voucher-header">
                        <div className="voucher-logo">
                            <h2>TRAVIS TOURS</h2>
                            <p style={{ color: '#888', fontSize: '0.8rem', marginTop: '5px' }}>OFFICIAL TRAVEL VOUCHER</p>
                        </div>
                        <div className="voucher-status-stamp">CONFIRMED</div>
                    </div>

                    <div className="voucher-body">
                        <div className="voucher-section">
                            <div className="info-block">
                                <label>Guest Name</label>
                                <p>{user?.user_metadata?.full_name || 'Travis Traveler'}</p>
                            </div>
                            <div className="info-block">
                                <label>Booking Reference</label>
                                <p>#TT-{booking.id.substring(0, 8).toUpperCase()}</p>
                            </div>
                        </div>

                        <div className="voucher-section">
                            <div className="info-block">
                                <label>Destination</label>
                                <p>{booking.destination}</p>
                            </div>
                            <div className="info-block">
                                <label>Travel Date</label>
                                <p>{booking.travel_date}</p>
                            </div>
                            <div className="info-block">
                                <label>Package Type</label>
                                <p>{booking.package_type}</p>
                            </div>
                            <div className="info-block">
                                <label>Total Travelers</label>
                                <p>{booking.travelers} Guest(s)</p>
                            </div>
                        </div>

                        <div className="voucher-section" style={{ borderTop: '1px solid #f0f0f0', paddingTop: '20px' }}>
                            <div className="info-block">
                                <label>Status</label>
                                <p style={{ color: '#4CAF50' }}>● Fully Paid</p>
                            </div>
                            <div className="info-block">
                                <label>Support Care</label>
                                <p>+91 1800-TRAVIS-TOURS</p>
                            </div>
                        </div>
                    </div>

                    <div className="voucher-footer">
                        <div className="voucher-terms">
                            <p><strong>Terms & Conditions:</strong> Please carry a valid Photo ID at the time of check-in. This voucher is valid only for the dates mentioned above. For cancellations, please contact 24 hours prior to travel.</p>
                        </div>
                        <div className="voucher-qr">
                            📱
                        </div>
                    </div>

                    <div className="voucher-actions">
                        <button className="btn btn-outline" onClick={onClose}>Close</button>
                        <button className="btn btn-primary" onClick={handlePrint}>Print Voucher</button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="dashboard-page">
            {/* Sidebar */}
            <aside className="dashboard-sidebar glassmorphism">
                <div className="sidebar-header">
                    <div className="user-avatar sidebar-avatar-clickable">
                        {user?.user_metadata?.avatar_url ? (
                            <img src={user.user_metadata.avatar_url} alt="Profile" />
                        ) : (
                            getInitials()
                        )}
                        <label htmlFor="avatar-upload-sidebar" className="sidebar-avatar-overlay">
                            <span>Change</span>
                        </label>
                    </div>
                    <input
                        type="file"
                        id="avatar-upload-sidebar"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        disabled={uploading}
                        style={{ display: 'none' }}
                    />
                    <div className="user-info">
                        <h3>{user?.user_metadata?.full_name || 'Travis Traveler'}</h3>
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
                    <button className="logout-btn" onClick={handleSignOut}>
                        <span className="nav-icon">🚪</span> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="dashboard-main">
                <div className="dashboard-header">
                    <h1>Welcome, {user?.user_metadata?.full_name?.split(' ')[0] || 'Traveler'}</h1>
                    <p>Track your trips and manage your account details.</p>
                </div>

                {activeTab === 'bookings' && (
                    <div className="dashboard-section fade-up">
                        <div className="section-title-row">
                            <h2>My Bookings</h2>
                            <button className="btn btn-primary small" onClick={() => navigate('/book')}>New Booking</button>
                        </div>

                        {loading ? (
                            <p>Loading your adventures...</p>
                        ) : userBookings.length > 0 ? (
                            <div className="booking-grid">
                                {userBookings.map(book => (
                                    <div key={book.id} className="dashboard-card glassmorphism">
                                        <div className="card-header">
                                            <span className="booking-id">#ID-{book.id.substring(0, 8)}</span>
                                            <span className="status-badge confirmed">Confirmed</span>
                                        </div>
                                        <div className="card-body">
                                            <h3>{book.destination}</h3>
                                            <p className="package-name">{book.package_type}</p>
                                            <div className="card-details">
                                                <span>📅 {book.travel_date}</span>
                                                <span className="price">👤 {book.travelers} Traveler(s)</span>
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <button
                                                className="btn btn-outline small"
                                                onClick={() => handleViewVoucher(book)}
                                            >
                                                View Voucher
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="empty-state">
                                <p>No bookings found. Start your journey today!</p>
                                <button className="btn btn-primary mt-20" onClick={() => navigate('/packages')}>Browse Packages</button>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'profile' && (
                    <div className="dashboard-section fade-up">
                        <h2>Profile Settings</h2>
                        <div className="dashboard-card glassmorphism profile-settings">
                            <div className="profile-header-main">
                                <div className="profile-avatar-wrapper">
                                    <div className="profile-avatar-large">
                                        {user?.user_metadata?.avatar_url ? (
                                            <img src={user.user_metadata.avatar_url} alt="Profile" />
                                        ) : (
                                            getInitials()
                                        )}
                                        <label htmlFor="avatar-upload" className="avatar-edit-btn">
                                            {uploading ? '...' : '📷'}
                                        </label>
                                    </div>
                                    <input
                                        type="file"
                                        id="avatar-upload"
                                        accept="image/*"
                                        onChange={handleAvatarUpload}
                                        disabled={uploading}
                                        style={{ display: 'none' }}
                                    />
                                    <p className="avatar-hint">Click camera to change photo</p>
                                </div>
                            </div>
                            <div className="profile-grid">
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input type="text" defaultValue={user?.user_metadata?.full_name} readOnly />
                                </div>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input type="email" defaultValue={user?.email} readOnly />
                                </div>
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input type="tel" defaultValue={user?.user_metadata?.phone || '+91 ---'} readOnly />
                                </div>
                                <div className="form-group">
                                    <label>Account Status</label>
                                    <input type="text" defaultValue="Verified Traveler" readOnly />
                                </div>
                            </div>
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

            {showVoucher && (
                <VoucherModal
                    booking={selectedBooking}
                    onClose={() => setShowVoucher(false)}
                />
            )}
        </div>
    );
};

export default Dashboard;
