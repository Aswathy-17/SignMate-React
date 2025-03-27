import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <h3>SIGN KIT</h3>
          <p>A comprehensive toolkit containing various features related to American Sign Language and Indian Sign Language.</p>
        </div>
        <div className="footer-section">
          <h3>Services</h3>
          <p>Convert ASL, Convert ISL</p>
        </div>
        <div className="footer-section">
          <h3>Useful Links</h3>
          <p>Github</p>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>NITK Surathkal, Mangalore</p>
          <p>aprameyadash.191it209@nitk.edu.in</p>
          <p>pratham.191it241@nitk.edu.in</p>
          <p>+91 7735784564</p>
          <p>+91 9008240665</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 Copyright</p>
      </div>
    </footer>
  );
};

export default Footer;