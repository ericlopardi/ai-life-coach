import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../lib/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

const SESSION_TIMEOUT = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
// const SESSION_TIMEOUT = 7 * 24 * 60 * 60 * 1000; // 7 days
// const SESSION_TIMEOUT = 24 * 60 * 60 * 1000; // 24 hours

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const logout = async () => {
        try {
            await signOut(auth);
            await AsyncStorage.removeItem('lastActivity');
            setUser(null);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const updateLastActivity = async () => {
        await AsyncStorage.setItem('lastActivity', Date.now().toString());
    };

    const checkSessionTimeout = async () => {
        try {
            const lastActivity = await AsyncStorage.getItem('lastActivity');
            if (lastActivity) {
                const timeSinceLastActivity = Date.now() - parseInt(lastActivity);
                if (timeSinceLastActivity > SESSION_TIMEOUT) {
                    console.log('Session expired, logging out user');
                    await logout();
                    return true;
                }
            }
            return false;
        } catch (error) {
            console.error('Error checking session timeout:', error);
            return false;
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                // Check if session has expired
                const sessionExpired = await checkSessionTimeout();
                
                if (!sessionExpired) {
                    setUser({
                        uid: currentUser.uid,
                        email: currentUser.email,
                        displayName: currentUser.displayName,
                    });
                    await updateLastActivity();
                }
            } else {
                setUser(null);
                await AsyncStorage.removeItem('lastActivity');
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const checkOnAppFocus = async () => {
            if (user) {
                const sessionExpired = await checkSessionTimeout();
                if (!sessionExpired) {
                    await updateLastActivity();
                }
            }
        };

        // We can add app state change listener here if needed
        checkOnAppFocus();
    }, [user]);

    return (
        <AuthContext.Provider value={{ 
            user, 
            loading, 
            logout,
            updateLastActivity 
        }}>
            {children}
        </AuthContext.Provider>
    );
};