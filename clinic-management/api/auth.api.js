/**
 * ============================================================
 * MediCare Premium
 * Authentication API Service
 * ============================================================
 */

import api from "./api.js";

class AuthAPI {

    /**
     * Login
     */
    async login(email, password) {

        return await api.post("/auth/login", {
            email,
            password
        });

    }

    /**
     * Logout
     */
    async logout() {

        return await api.post("/auth/logout");

    }

    /**
     * Get Current User
     */
    async getCurrentUser() {

        return await api.get("/auth/me");

    }

    /**
     * Refresh JWT Token
     */
    async refreshToken() {

        return await api.post("/auth/refresh");

    }

    /**
     * Change Password
     */
    async changePassword(currentPassword, newPassword) {

        return await api.post("/auth/change-password", {

            currentPassword,

            newPassword

        });

    }

    /**
     * Forgot Password
     */
    async forgotPassword(email) {

        return await api.post("/auth/forgot-password", {

            email

        });

    }

    /**
     * Reset Password
     */
    async resetPassword(token, password) {

        return await api.post("/auth/reset-password", {

            token,

            password

        });

    }

    /**
     * Verify Email
     */
    async verifyEmail(token) {

        return await api.post("/auth/verify-email", {

            token

        });

    }

}

export default new AuthAPI();