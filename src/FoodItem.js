// FoodItem.js
import React from 'react';
import './FoodItem.css'; // Make sure to create this CSS file

function FoodItem({ name, description, price, imageUrl }) {
  return (
    <div className="food-item-card">
      <img src={imageUrl} alt={name} className="food-item-image" />
      <div className="food-item-info">
        <h3>{name}</h3>
        <p>{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
}

export default FoodItem;

