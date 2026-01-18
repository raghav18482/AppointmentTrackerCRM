import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            padding: '2rem 0',
            textAlign: 'center',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            color: 'var(--color-text-muted)',
            fontSize: '0.875rem'
        }}>
            <div className="container">
                <p>&copy; {new Date().getFullYear()} CrowdManager. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
