import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { useRouter } from 'expo-router';
import { NO_AUTH_REDIRECT } from '../constants/constants';

export const redirectIfUnauthenticated = (user, loading, router, redirectPath = '(auth)/signIn') => {
    if (!loading && !user) {
        router.replace(redirectPath);
    }
} 

export const useAuthRedirect = (redirectPath = '(auth)/signIn') => {
    const { user, loading } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        redirectIfUnauthenticated(user, loading, router, redirectPath);
    }, [user, loading, router, redirectPath]);

    return { user, loading };

};