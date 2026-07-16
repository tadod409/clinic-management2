/**
 * ============================================================
 * MediCare Premium
 * Authentication Storage Manager
 * ============================================================
 */

import CONFIG from "../config/config.js";

const TOKEN_KEY = CONFIG.AUTH.TOKEN_KEY;
const USER_KEY = CONFIG.AUTH.USER_KEY;
const REMEMBER_KEY = CONFIG.AUTH.REMEMBER_KEY;

/**
 * Save JWT Token
 */
export function saveToken(token) {

    if (!token) return;

    localStorage.setItem(TOKEN_KEY, token);

}

/**
 * Get JWT Token
 */
export function getToken() {

    return localStorage.getItem(TOKEN_KEY);

}

/**
 * Remove JWT Token
 */
export function removeToken() {

    localStorage.removeItem(TOKEN_KEY);

}

/**
 * Save Current User
 */
export function saveUser(user) {

    if (!user) return;

    localStorage.setItem(USER_KEY, JSON.stringify(user));

}

/**
 * Get Current User
 */
export function getUser() {

    const user = localStorage.getItem(USER_KEY);

    if (!user) {

        return null;

    }

    try {

        return JSON.parse(user);

    }

    catch {

        return null;

    }

}

/**
 * Remove User
 */
export function removeUser() {

    localStorage.removeItem(USER_KEY);

}

/**
 * Save Remember Me
 */
export function saveRememberMe(value = true) {

    localStorage.setItem(REMEMBER_KEY, value);

}

/**
 * Get Remember Me
 */
export function getRememberMe() {

    return localStorage.getItem(REMEMBER_KEY) === "true";

}

/**
 * Remove Remember Me
 */
export function removeRememberMe() {

    localStorage.removeItem(REMEMBER_KEY);

}

/**
 * Check Authentication
 */
export function isAuthenticated() {

    return !!getToken();

}

/**
 * Clear Session
 */
export function clearAuth() {

    removeToken();

    removeUser();

    removeRememberMe();

}

/**
 * Decode JWT Payload
 */
export function decodeToken() {

    const token = getToken();

    if (!token) return null;

    try {

        const payload = token.split(".")[1];

        return JSON.parse(atob(payload));

    }

    catch {

        return null;

    }

}

/**
 * Check JWT Expiration
 */
export function isTokenExpired() {

    const payload = decodeToken();

    if (!payload || !payload.exp) {

        return true;

    }

    const currentTime = Math.floor(Date.now() / 1000);

    return currentTime >= payload.exp;

}

/**
 * Get User Role
 */
export function getUserRole() {

    const user = getUser();

    return user?.role || null;

}

/**
 * Get User Name
 */
export function getUserName() {

    const user = getUser();

    return user?.name || "";

}

/**
 * Get User ID
 */
export function getUserId() {

    const user = getUser();

    return user?.id || null;

}