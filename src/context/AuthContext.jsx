import React, { Children } from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import { json } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({Children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
        } 
    }, []);

    const login = (userData) => {
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
    }

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    } 

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {Children}
        </AuthContext.Provider> 
    )
}   

export const useAuth = () => useContext(AuthContext);