import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container navbar-content">
                <div className="logo">
                    <Link to="/" className="text-gradient font-bold text-2xl">CrowdManager</Link>
                </div>

                <div className="desktop-links">
                    <a href="#features">Use Cases</a>
                    <a href="#pricing">Pricing</a>
                    <a href="#contact">Contact</a>
                </div>

                <div className="auth-buttons">
                    <Link to="/login" className="btn-link">Login</Link>
                    <Link to="/register" className="btn-primary">Get Started</Link>
                </div>

                <button
                    className="mobile-menu-btn"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {isMobileMenuOpen && (
                <div className="mobile-menu glass-panel">
                    <a href="#features" onClick={() => setIsMobileMenuOpen(false)}>Use Cases</a>
                    <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)}>Pricing</a>
                    <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                    <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>Register</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
