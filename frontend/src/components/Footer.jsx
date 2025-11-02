import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-info">
          <p>&copy; 2025 ChatBI. All rights reserved.</p>
          <p>Business Intelligence Platform</p>
        </div>

        <div className="footer-links">
          <a href="#help">Help</a>
          <a href="#docs">Documentation</a>
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
        </div>

        <div className="footer-version">
          <span>v1.0.0</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;