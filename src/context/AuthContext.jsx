import { createContext, useEffect, useState } from "react";

export const authContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(() => {
        const storedUser = localStorage.getItem('userInfo');
        if (storedUser) {
            try {
                return JSON.parse(storedUser);
            } catch (error) {
                console.error('Failed to parse stored user info:', error);
                return null; 
            }
        }
        return null; 
    });

    const updateUser = (data) => {
        setCurrentUser(data);
    };

    useEffect(() => {
        
        if (currentUser !== null) {
            try {
                localStorage.setItem('userInfo', JSON.stringify(currentUser));
            } catch (error) {
                console.error('Failed to stringify and store currentUser:', error);
            }
        }
    }, [currentUser]);

    return (
        <authContext.Provider value={{ currentUser, updateUser }}>
            {children}
        </authContext.Provider>
    );
};
