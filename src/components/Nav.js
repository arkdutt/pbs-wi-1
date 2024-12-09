import React from 'react';
import './Nav.css';

function Nav() {
    return (
        <nav className="nav">
            <button className="nav-link nav-link-active">
                <i className="material-icons nav-icon">near_me</i>
                <span className="nav-text">Near You</span>
            </button>
            <button className="nav-link">
                <i className="material-icons nav-icon">search</i>
                <span className="nav-text">Search</span>
            </button>
        </nav>
    );
}

export default Nav;