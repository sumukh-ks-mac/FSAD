import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] =  useState(' ');
    
    const login = (username, password) => {
        const validUsername = 'admin';
        const validPassword = 'admin';

        if(username === validUsername && password === validPassword){
            setIsAuthenticated(true);
            setError('');            
        }else{
            setError('Invalid credentials. Please try again');
            setIsAuthenticated(false)
        }
    };
    const logout = () => {
        setIsAuthenticated(false);
    };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);