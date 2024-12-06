import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import './Login.css';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { setIsLoggedIn, setUserEmail, setUserId } = useContext(AuthContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage('');

        try {
            const response = await fetch('http://localhost:3001/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token); // Store the token
                setUserEmail(email); // Update userEmail in AuthContext
                localStorage.setItem('userEmail', email); // Store userEmail in localStorage
                // Check if the backend login response includes a userId
                if (data.userId) {
                    setUserId(data.userId); // Update userId in AuthContext
                    localStorage.setItem('userId', data.userId); // Store userId in localStorage

                }

                setIsLoggedIn(true); // Update login state
                navigate('/');
            } else {
                const errorResponse = await response.json();
                setErrorMessage(errorResponse.message || 'Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setErrorMessage('An error occurred during login. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <div className="user-icon">
                <FontAwesomeIcon icon={faUser} size="3x" />
            </div>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="input-container">
                    <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <FontAwesomeIcon icon={faLock} className="input-icon" />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">LOGIN</button>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <div className="signup-link">
                    <Link to="/signup">SIGN UP HERE.</Link>
                </div>
                {/* Uncomment and modify this section when Forgot Password functionality is implemented */}
                {/* <div className="forgot-password">
                    <button onClick={() => navigate('/forgot-password')} className="forgot-password-link">
                        Forgot Password?
                    </button>
                </div> */}
            </form>
        </div>
    );
}

export default Login;
