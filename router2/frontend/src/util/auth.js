import { redirect } from "react-router-dom";

export function getTokenDuration() {
    const storedExpirationDate = localStorage.getItem('expiration');
    const expirationDate = new Date(storedExpirationDate);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration;
}

export function getAuthToken() {
    const token = localStorage.getItem('token');
    const tokenDuration = getTokenDuration();

    if (tokenDuration < 0) {
        // return 'EXPIRED';
        return false;
    }

    return token;
}

export function tokenLoader() {
    return getAuthToken();
}

export function checkAuth() {
    const token = getAuthToken();

    if (!token) {
        return redirect('/auth?mode=login');
    }

    return null;
}

export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
}