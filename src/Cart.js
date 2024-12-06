import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Adjust the path as necessary
import './Cart.css';

function Cart({ cartItems, removeFromCart, updateQuantity }) {
    const navigate = useNavigate();
    const { userId } = useContext(AuthContext);
    
    // Retrieve user data from context

    // ... existing Cart component code

    const handleCheckout = () => {
        // Ensure user data is included when navigating to Checkout
        navigate('/checkout', { state: { cartItems, userId } });
    };

    // Handlers for cart actions
    const handleRemove = (itemId) => {
        removeFromCart(itemId);
    };

    const handleQuantityChange = (itemId, newQuantity) => {
        updateQuantity(itemId, newQuantity);
    };

    return (
        <div className="cart-page">
            <h1>Your Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <div key={item.id} className="cart-item">
                                <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h3>{item.name}</h3>
                                    <p>{item.description}</p>
                                    <p>${item.price}</p>
                                    <div className="cart-item-actions">
                                        <button onClick={() => handleRemove(item.id)}>Remove</button>
                                        <input className='quantity' 
                                            type="number" 
                                            min="1" 
                                            value={item.quantity} 
                                            onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="checkout-container">
                        <button onClick={handleCheckout} className="checkout-button">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;
