import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { useRouter } from 'expo-router';
import { ROUTES } from '../constants/constants';

export const redirectIfUnauthenticated = (user, loading, router, redirectPath = ROUTES.PUBLIC_REDIRECT) => {
    if (!loading && !user) {
        router.replace(redirectPath);
    }
} 

export const redirectIfAuthenticated = (user, loading, router, redirectPath = ROUTES.PROTECTED_REDIRECT) => {
    if (!loading && user) {
        router.replace(redirectPath);
    }
}

export const usePublicRedirect = (redirectPath = ROUTES.PUBLIC_REDIRECT) => {
    const { user, loading } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        redirectIfUnauthenticated(user, loading, router, redirectPath);
    }, [user, loading, router, redirectPath]);

    return { user, loading };
};

export const useProtectedRedirect = (redirectPath = ROUTES.PROTECTED_REDIRECT) => {
    const { user, loading } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        redirectIfAuthenticated(user, loading, router, redirectPath);
    }, [user, loading, router, redirectPath]);

    return { user, loading };
}