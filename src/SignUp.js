// SignUp.js
import React, { useState } from 'react';
import './SignUp.css'; // Ensure the path to your CSS file is correct
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function SignUp() {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update the URL to point to your backend server.
      // Assuming your server is running on localhost port 3001
      const response = await fetch('http://localhost:3001/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      console.log(response.ok);

      if (response.ok) {
        // Redirect to home page upon successful sign-up
        window.location.href = '/';
      } else {
        // Handle sign-up error (e.g., display error message)
        console.error('Sign-up failed:', response);
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="sign-up-container">
      <div className="user-icon2">
        <FontAwesomeIcon icon={faUser} size="3x" />
      </div>
      <h2 className="sign-up-title">Sign Up</h2>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          className="sign-up-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="sign-up-input"
        />
        <button type="submit" className="sign-up-button">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;

