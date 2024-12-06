import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './PaymentSuccess.css'; 

function PaymentSuccess() {
    const location = useLocation();
    const { cartItems, address, orderNumber, userName } = location.state || {};

    return (
        <div className="payment-success">
            <h1>Payment Successful!</h1>
            <p>Thank you for your order, {userName}. A confirmation email has been sent to your email address.</p>
            
            <h3>Order Details:</h3>
            <p>Order Number: {orderNumber}</p>
            <ul>
                {cartItems && cartItems.map(item => (
                    <li key={item.id}>
                        {item.name} - Quantity: {item.quantity} - Price: ${item.price}
                    </li>
                ))}
            </ul>
            
            <p>Delivery Address:</p>
            <p>{address}</p>

            <p><Link to="/">Go to Home</Link></p> {/* Link to home or other relevant page */}
        </div>
    );
}

export default PaymentSuccess;
