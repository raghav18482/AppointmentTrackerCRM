import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    return (
        <section id="contact" className="contact-section">
            <div className="container">
                <div className="contact-grid">
                    <div className="contact-info">
                        <h2 className="section-title">Get in <span className="text-gradient">Touch</span></h2>
                        <p className="contact-desc">
                            Have questions about how Smart Queue can help your business?
                            Our team is here to help you get started.
                        </p>

                        <div className="contact-items">
                            <div className="contact-item">
                                <div className="icon-box">
                                    <Phone className="text-primary" />
                                </div>
                                <div>
                                    <h4>Call Us</h4>
                                    <p>+91 6363812833</p>
                                </div>
                            </div>

                            <div className="contact-item">
                                <div className="icon-box">
                                    <Mail className="text-secondary" />
                                </div>
                                <div>
                                    <h4>Email Us</h4>
                                    <p>appointmenthelpdesk@gmail.com</p>
                                </div>
                            </div>

                            <div className="contact-item">
                                <div className="icon-box">
                                    <MapPin className="text-primary" />
                                </div>
                                <div>
                                    <h4>Visit Us</h4>
                                    <p>Indore, Madhya Pradesh</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form className="contact-form glass-panel">
                        <h3>Send a Message</h3>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input type="text" placeholder="John Doe" />
                        </div>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input type="email" placeholder="john@example.com" />
                        </div>
                        <div className="form-group">
                            <label>Message</label>
                            <textarea rows="4" placeholder="How can we help you?"></textarea>
                        </div>
                        <button type="submit" className="btn-primary w-full flex-center justify-center">
                            Send Message <Send size={16} style={{ marginLeft: '8px' }} />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
