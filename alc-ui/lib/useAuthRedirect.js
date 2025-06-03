import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { useRouter } from 'expo-router';
import { NO_AUTH_REDIRECT, AUTH_REDIRECT } from '../constants/constants';

export const redirectIfUnauthenticated = (user, loading, router, redirectPath = NO_AUTH_REDIRECT) => {
    if (!loading && !user) {
        router.replace(redirectPath);
    }
} 

export const redirectIfAuthenticated = (user, loading, router, redirectPath = AUTH_REDIRECT) => {
    if (!loading && user) {
        router.replace(redirectPath);
    }
}

export const useAuthRedirect = (redirectPath = NO_AUTH_REDIRECT) => {
    const { user, loading } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        redirectIfUnauthenticated(user, loading, router, redirectPath);
    }, [user, loading, router, redirectPath]);

    return { user, loading };
};

export const useAuthenticatedRedirect = (redirectPath = AUTH_REDIRECT) => {
    const { user, loading } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        redirectIfAuthenticated(user, loading, router, redirectPath);
    }, [user, loading, router, redirectPath]);

    return { user, loading };
}