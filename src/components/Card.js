import React from 'react';
import './Card.css';

function Card({ name, image }) {
    return (
        <div className="card">
            <img src={image} alt={name} />
            <div className="card-name">{name}</div>
        </div>
    );
}

export default Card;
