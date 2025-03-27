import React from "react";
import { Link } from "react-router-dom";
import Footer from '../components/Footer';
import "./Home.css";

const Home = () => {
  const scrollToGetStarted = () => {
    document.getElementById('get-started-section').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="home-container">
      <div className="home-page">
        <div className="welcome-section">
          <h1>Welcome to SignMate!</h1>
          <p>The complete toolkit for American Sign Language and Indian Sign Language. Explore our range of features which have been carefully designed keeping in mind the specific needs of people related to ASL and ISL.</p>
          <button onClick={scrollToGetStarted} className="get-started-button">Get Started</button>
        </div>
      </div>

      <div id="get-started-section" className="get-started-section">
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
    </div>
  );
};

export default Home;