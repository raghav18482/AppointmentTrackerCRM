import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { ArrowLeft, Loader2, Eye, EyeOff } from 'lucide-react';
import '../components/Contact.css'; // Reusing form styles

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // 1. Login
            const loginResponse = await authService.login(formData);

            if (loginResponse.access_token) {
                // 2. Store Token & IDs
                localStorage.setItem('token', loginResponse.access_token);
                localStorage.setItem('token_type', loginResponse.token_type || 'Bearer');

                if (loginResponse.user_id) localStorage.setItem('user_id', loginResponse.user_id);
                if (loginResponse.business_id) localStorage.setItem('business_id', loginResponse.business_id);

                // 3. Get Role (if business_id exists)
                if (loginResponse.business_id) {
                    try {
                        const roleResponse = await authService.getRole(loginResponse.business_id);
                        localStorage.setItem('role', roleResponse.role);
                        if (roleResponse.business_name) {
                            localStorage.setItem('business_name', roleResponse.business_name);
                        }
                    } catch (roleErr) {
                        console.warn('Failed to fetch role:', roleErr);
                        // Non-blocking, but might affect UI
                    }
                } else {
                    // New User / Owner without business
                    console.log('No business_id found. Assuming new OWNER.');
                    localStorage.setItem('role', 'OWNER');
                }

                navigate('/dashboard');
            } else {
                setError("Invalid response from server: No access token");
            }

        } catch (err) {
            console.error('Login error:', err);
            // Detailed error handling
            if (err.message === 'Network Error') {
                setError('Cannot connect to server. Is the backend running?');
            } else {
                setError(err.response?.data?.detail || 'Login failed. Please check your credentials.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
        }}>
            <Link to="/" style={{ position: 'absolute', top: '2rem', left: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)' }}>
                <ArrowLeft size={20} /> Back to Home
            </Link>

            <div className="glass-panel" style={{ width: '100%', maxWidth: '450px', padding: '3rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h2 className="text-gradient" style={{ fontSize: '2rem', fontWeight: '700' }}>Welcome Back</h2>
                    <p style={{ color: 'var(--color-text-muted)' }}>Login to manage your queue</p>
                </div>

                {error && (
                    <div style={{
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid #ef4444',
                        color: '#ef4444',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        marginBottom: '1.5rem',
                        fontSize: '0.875rem'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="you@company.com"
                        />
                    </div>
                    <div className="form-group" style={{ position: 'relative' }}>
                        <label>Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder="••••••••"
                            style={{ paddingRight: '40px' }}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: 'absolute',
                                right: '10px',
                                top: '38px', // Adjusted to align with input
                                background: 'none',
                                color: 'var(--color-text-muted)',
                                cursor: 'pointer'
                            }}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="btn-primary w-full flex-center justify-center"
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="animate-spin" /> : 'Login'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                    Don't have an account? <Link to="/register" style={{ color: 'var(--color-primary)' }}>Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
