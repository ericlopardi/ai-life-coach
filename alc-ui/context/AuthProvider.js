import { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../lib/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GENERAL } from '../constants/constants';
import apiClient from '../lib/apiClient'

export const AuthContext = createContext();

// const SESSION_TIMEOUT = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
// const SESSION_TIMEOUT = 7 * 24 * 60 * 60 * 1000; // 7 days
const SESSION_TIMEOUT = 24 * 60 * 60 * 1000; // 24 hours

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const logout = async () => {
        try {
            await signOut(auth);
            await AsyncStorage.removeItem('lastActivity');
            await AsyncStorage.removeItem(GENERAL.AUTHORIZATION_TOKEN);
            setUser(null);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const firebaseUser = userCredential.user;
            const userData = await retrieveUserData(firebaseUser.uid)
            const newUserData = {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
                journalEntriesTotal: userData.journalEntries?.length || 0,
                moodEntriesTotal: userData.checkIns?.length || 0
            };
            setUser(newUserData);
            const idToken = await firebaseUser.getIdToken();
            await AsyncStorage.setItem(GENERAL.AUTHORIZATION_TOKEN, idToken);
            await updateLastActivity();
            return firebaseUser
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    const register = async (email, password, displayName) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const firebaseUser = userCredential.user;
            await updateProfile(firebaseUser, { displayName });
            const userData = await retrieveUserData(firebaseUser.uid)
            const newUserData = {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
                journalEntiresTotal: userData.journalEntries?.length || 0,
                moodEntriesTotal: userData.checkIns?.length || 0 
            };
            setUser(newUserData);
            const idToken = await firebaseUser.getIdToken();
            await AsyncStorage.setItem(GENERAL.AUTHORIZATION_TOKEN, idToken);
            await updateLastActivity();
            return firebaseUser
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    }

    const retrieveUserData = async (firebaseUid) => {
        const userData = await apiClient.get(`/users/${firebaseUid}`)
        if (!userData) throw new Error("Unable to retrieve user data in MongoDB")
        return userData.data.data
    }

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
            login,
            register,
            updateLastActivity 
        }}>
            {children}
        </AuthContext.Provider>
    );
};