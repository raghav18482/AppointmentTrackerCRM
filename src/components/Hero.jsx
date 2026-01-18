import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-glow"></div>
            <div className="container hero-content">
                <div className="badge glass-panel">
                    <Sparkles size={16} className="text-secondary" />
                    <span>Next Gen Queue Management</span>
                </div>

                <h1 className="hero-title">
                    Master the crowd with <br />
                    <span className="text-gradient">Smart Intelligence</span>
                </h1>

                <p className="hero-subtitle">
                    Optimize your business flow with our AI-powered queuing system.
                    Prioritize emergencies, reduce wait times, and keep customers happy using
                    real-time WhatsApp updates.
                </p>

                <div className="hero-actions">
                    <Link to="/register" className="btn-primary flex-center">
                        Start Free Trial <ArrowRight size={20} style={{ marginLeft: '8px' }} />
                    </Link>
                    <a href="#features" className="btn-outline">
                        Learn More
                    </a>
                </div>

                <div className="hero-stats glass-panel">
                    <div className="stat-item">
                        <span className="stat-value text-gradient">2x</span>
                        <span className="stat-label">Faster Service</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <span className="stat-value text-gradient">99%</span>
                        <span className="stat-label">Customer Satisfaction</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <span className="stat-value text-gradient">24/7</span>
                        <span className="stat-label">Automated Alerts</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
