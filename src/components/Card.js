import React from 'react';
import './Card.css';

function Card({ name, image, onClick }) {
    return (
        <div className="card" onClick={onClick}>
            <img src={image} alt={name} />
            <div className="card-name">{name}</div>
        </div>
    );
}

export default Card;
