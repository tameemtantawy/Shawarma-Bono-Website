import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');
    const [userId, setUserId] = useState(localStorage.getItem('userId') || ''); // Add this line

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userEmail, setUserEmail, userId, setUserId }}>
            {children}
        </AuthContext.Provider>
    );
};
