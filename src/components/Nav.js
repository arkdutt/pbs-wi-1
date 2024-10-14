import React from 'react';
import './Nav.css';

function Nav() {
    return (
        <nav className="nav">
            <a href="#" className="nav-link nav-link-active">
                <i className="material-icons nav-icon">near_me</i>
                <span className="nav-text">Near You</span>
            </a>
            <a href="#" className="nav-link">
                <i className="material-icons nav-icon">search</i>
                <span className="nav-text">Search</span>
            </a>
        </nav>
    );
}

export default Nav;