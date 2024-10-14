import React from 'react';
import './Header.css';
import logo from '../assets/logos/pbs-wisconsin-wblue-rgb.png';

function Header() {
    return (
        <header className="header">
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
        </header>
    );
}

export default Header;