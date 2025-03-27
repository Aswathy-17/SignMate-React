import React from "react";
import { Link } from "react-router-dom";
import './Header.css';
import PropTypes from 'prop-types';



const Header = () => {
  return (
    <header>
    <div className="header-content">
      <h1>SignMate</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="asl">Generate ASL</Link>
        <Link to="/isl">Generate ISL</Link>
      </nav>
    </div>
  </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;