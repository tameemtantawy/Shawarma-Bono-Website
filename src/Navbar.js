// Navbar.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from './AuthContext'; // Adjust the path as needed
import './Navbar.css'; // Adjust the path if necessary


function Navbar({ searchTerm, handleSearchChange, handleKeyDown }) {
    const { isLoggedIn, setIsLoggedIn, userEmail, setUserEmail } = useContext(AuthContext);

    const getUsername = (email) => {
        return email.substring(0, email.indexOf('@'));
    };
 
    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserEmail('');
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        // Redirect or update UI as needed
    };


    return (
        <nav className="navigation">
            <div className="search-container">
                {searchTerm === '' && <FontAwesomeIcon icon={faSearch} className="search-icon" />}
                <input
                    type="text"
                    placeholder="Search for items..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
                    className={`search-input ${searchTerm === '' ? 'with-icon' : ''}`}
                />
            </div>
            {isLoggedIn ? (
                <>
                    <span className="navbar-username">{getUsername(userEmail)}</span>
                    <button onClick={handleLogout} className='logout_button'>Logout</button>
                </>
            ) : (
                <div>
                    <Link to="/login" className="nav-button">Login</Link>
                    <Link to="/signup" className="nav-button">Sign Up</Link>
                </div>
            )}
            <Link to="/cart" className="nav-button">
                <FontAwesomeIcon icon={faShoppingCart} />
            </Link>
        </nav>
    );
}

export default Navbar;
