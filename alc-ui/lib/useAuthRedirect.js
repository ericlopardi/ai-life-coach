import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { useRouter } from 'expo-router';
import { ROUTES } from '../constants/constants';

export const redirectIfUnauthenticated = (user, loading, router, redirectPath = ROUTES.NO_AUTH_REDIRECT) => {
    if (!loading && !user) {
        router.replace(redirectPath);
    }
} 

export const redirectIfAuthenticated = (user, loading, router, redirectPath = ROUTES.AUTH_REDIRECT) => {
    if (!loading && user) {
        router.replace(redirectPath);
    }
}

export const usePublicRedirect = (redirectPath = ROUTES.NO_AUTH_REDIRECT) => {
    const { user, loading } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        redirectIfUnauthenticated(user, loading, router, redirectPath);
    }, [user, loading, router, redirectPath]);

    return { user, loading };
};

export const useProtectedRedirect = (redirectPath = ROUTES.AUTH_REDIRECT) => {
    const { user, loading } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        redirectIfAuthenticated(user, loading, router, redirectPath);
    }, [user, loading, router, redirectPath]);

    return { user, loading };
}