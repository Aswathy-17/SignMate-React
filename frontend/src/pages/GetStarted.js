import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import './GetStarted.css';

const GetStarted = () => {
  return (
    <div className="get-started-page">
      <div className="content-section">
        <h2>We&apos;ve what you need!</h2>
        <p>A comprehensive and aesthetic American Sign Language and Indian Sign Language toolkit. A minimalist yet informative interface. Wide range of features containing different functionalities that are necessary to work with ASL and ISL. What else do you need anyway! We have everything wrapped up here!</p>
        <p>Dive into our diverse services and let us know about your experience!</p>
        <div className="button-section">
          <Link to="/isl" className="service-button">Generate ISL</Link>
          <Link to="/asl" className="service-button">Generate ASL</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GetStarted;