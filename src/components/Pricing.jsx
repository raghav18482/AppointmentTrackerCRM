import React from 'react';
import { Check } from 'lucide-react';
import './Pricing.css';

const Pricing = () => {
    return (
        <section id="pricing" className="pricing-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Simple <span className="text-gradient">Pricing</span></h2>
                    <p className="section-subtitle">Start organizing your queues today.</p>
                </div>

                <div className="pricing-grid">
                    {/* Starter Plan */}
                    <div className="pricing-card glass-panel">
                        <h3 className="plan-name">Starter</h3>
                        <div className="plan-price">
                            <span className="currency">$</span>
                            <span className="amount">29</span>
                            <span className="period">/mo</span>
                        </div>
                        <p className="plan-desc">Perfect for small barber shops or clinics.</p>
                        <ul className="plan-features">
                            <li><Check size={18} className="text-primary" /> 1 Counter</li>
                            <li><Check size={18} className="text-primary" /> 100 Appointments/mo</li>
                            <li><Check size={18} className="text-primary" /> Basic Reporting</li>
                            <li><Check size={18} className="text-primary" /> Email Support</li>
                        </ul>
                        <button className="btn-outline w-full">Choose Starter</button>
                    </div>

                    {/* Pro Plan */}
                    <div className="pricing-card glass-panel popular">
                        <div className="popular-badge">Most Popular</div>
                        <h3 className="plan-name">Professional</h3>
                        <div className="plan-price">
                            <span className="currency">$</span>
                            <span className="amount">79</span>
                            <span className="period">/mo</span>
                        </div>
                        <p className="plan-desc">For growing businesses with high traffic.</p>
                        <ul className="plan-features">
                            <li><Check size={18} className="text-secondary" /> 5 Counters</li>
                            <li><Check size={18} className="text-secondary" /> Unlimited Appointments</li>
                            <li><Check size={18} className="text-secondary" /> WhatsApp Notifications</li>
                            <li><Check size={18} className="text-secondary" /> Emergency Queue Logic</li>
                            <li><Check size={18} className="text-secondary" /> 24/7 Priority Support</li>
                        </ul>
                        <button className="btn-primary w-full">Choose Professional</button>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="pricing-card glass-panel">
                        <h3 className="plan-name">Enterprise</h3>
                        <div className="plan-price">
                            <span className="currency">$</span>
                            <span className="amount">199</span>
                            <span className="period">/mo</span>
                        </div>
                        <p className="plan-desc">For large hospitals and chains.</p>
                        <ul className="plan-features">
                            <li><Check size={18} className="text-primary" /> Unlimited Counters</li>
                            <li><Check size={18} className="text-primary" /> Custom Integration</li>
                            <li><Check size={18} className="text-primary" /> Dedicated Account Manager</li>
                            <li><Check size={18} className="text-primary" /> SLA & Refunds Management</li>
                        </ul>
                        <button className="btn-outline w-full">Contact Sales</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
