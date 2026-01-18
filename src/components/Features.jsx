import React from 'react';
import { Clock, Users, Smartphone, BarChart3, Bell, ShieldAlert } from 'lucide-react';
import './Features.css';

const featuresData = [
    {
        icon: <Users size={32} className="text-primary" />,
        title: "Smart Queue Logic",
        description: "Automatically balances Normal and Emergency queues. Serving 2 emergencies for every normal customer."
    },
    {
        icon: <Bell size={32} className="text-secondary" />,
        title: "WhatsApp Alerts",
        description: "Real-time notifications sent when customers are 9th in line. Automated re-ordering if they miss their turn."
    },
    {
        icon: <ShieldAlert size={32} className="text-primary" />,
        title: "Emergency Priority",
        description: "Dedicated fast-track lane for urgent cases in hospitals or premium clients in salons."
    },
    {
        icon: <BarChart3 size={32} className="text-secondary" />,
        title: "Live Dashboard",
        description: "Real-time analytics, notification statuses, and manual override controls for staff."
    },
    {
        icon: <Smartphone size={32} className="text-primary" />,
        title: "User Friendly",
        description: "Simple interface for both counter staff and customers. No learning curve."
    },
    {
        icon: <Clock size={32} className="text-secondary" />,
        title: "Refund Management",
        description: "Automated refund workflow with fine calculation for missed appointments."
    }
];

const Features = () => {
    return (
        <section id="features" className="features-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Why <span className="text-gradient">CrowdManager?</span></h2>
                    <p className="section-subtitle">Designed for Hospitals, Salons, Service Centers, and more.</p>
                </div>

                <div className="features-grid">
                    {featuresData.map((feature, index) => (
                        <div key={index} className="feature-card glass-panel">
                            <div className="feature-icon-wrapper">
                                {feature.icon}
                            </div>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
