import React, { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';


function Checkout() {
    const location = useLocation();
    const navigate = useNavigate();
    const { cartItems, userId } = location.state; // Ensure this state is correctly passed from the previous page
    const [user, setUser] = useState(null);
    const [address, setAddress] = useState('');
    const [isLoadingUser, setIsLoadingUser] = useState(true);
    const { isLoggedIn, userEmail } = useContext(AuthContext);
    const [paymentMethod, setPaymentMethod] = useState('');
    const orderNumber = `ORD-${Date.now()}`;



    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`http://localhost:3001/api/users/user/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch user details');
                }
                const userData = await response.json();
                setUser(userData);
                setAddress(userData.address || '');
            } catch (error) {
                console.error('Error fetching user details:', error);
            } finally {
                setIsLoadingUser(false);
            }
        };

        if (userId && isLoggedIn) {
            fetchUserDetails();
        } else {
            setIsLoadingUser(false); // No user details to load
        }
    }, [userId, isLoggedIn]);

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };
    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handlePayment = async () => {
        const token = localStorage.getItem('token');
    
        if (isLoggedIn && userId && token) {
            setIsLoadingUser(true); // Assuming you have an isLoading state to control UI feedback
            try {
                const response = await fetch('http://localhost:3001/api/users/update-address', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ userId, address })
                });
    
                // Process payment based on the selected payment method
                let paymentResult;
                if (paymentMethod === 'paypal') {
                    // Logic for PayPal would go here
                    paymentResult = { ok: true }; // Simulate a successful PayPal response
                } else if (paymentMethod === 'creditCard') {
                    const paymentResponse = await fetch('http://localhost:3001/api/payment/creditcard', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            userId,
                            amount: totalPrice,
                            // Additional credit card information
                        })
                    });
    
                    paymentResult = await paymentResponse.json();
                    if (!paymentResponse.ok) {
                        throw new Error('Payment failed');
                    }
                }
           
    
                // Check payment success before proceeding
                if (true) {
                    // Send order details to the database
                    const orderResponse = await fetch('http://localhost:3001/api/orders/order', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            userId,
                            items: cartItems.map(item => ({
                                product: item.name, // This field must exist and be named correctly according to your schema
                                quantity: item.quantity,
                                price: item.price
                            })),
                            total: totalPrice,
                            address,
                            orderNumber
                        })
                    });
    
                    if (!orderResponse.ok) {
                        throw new Error('Failed to save order details');
                    }
    
                    // Navigate to the payment success page with all relevant info
                    navigate('/paymentsuccess', { state: { userId, cartItems, address, userEmail, orderNumber } });
                } else {
                    throw new Error('Payment processing failed');
                }
            } catch (error) {
                console.error('Error during payment:', error);
                alert(error.message); // Show error message to the user
            } finally {
                setIsLoadingUser(false); // Turn off loading indicator
            }
        } else {
            alert('Missing user information or not logged in');
        }
    };
    





    return (
        <div className="checkout-page">
            <h1>Checkout</h1>
            <div className="order-summary">
                {cartItems.map(item => (
                    <div key={item.id} className="order-item">
                        <span>{item.name} - Quantity: {item.quantity} - Price: ${item.price * item.quantity}</span>
                    </div>
                ))}
                <p>Total Price: ${totalPrice.toFixed(2)}</p>
            </div>

            {isLoggedIn && !isLoadingUser && (
                <div>
                    <label htmlFor="address">Address:</label>
                    <input 
                        type="text" 
                        id="address" 
                        value={address} 
                        onChange={handleAddressChange} 
                        required 
                    />
                </div>
            )}

            <button onClick={handlePayment} className="checkout-button">
                Complete Payment
            </button>
        </div>
    );
}

export default Checkout;
