/**
 * ============================================================
 * MediCare Premium
 * Enterprise API Client
 * Version: 1.0
 * ============================================================
 */

import CONFIG from "../config/config.js";
import { getToken, clearAuth } from "../utils/token.js";

class API {

    constructor() {
        this.baseURL = CONFIG.API.BASE_URL;
        this.timeout = CONFIG.API.TIMEOUT;
    }

    async request(endpoint, options = {}) {

        const controller = new AbortController();

        const timeout = setTimeout(() => {
            controller.abort();
        }, this.timeout);

        const token = getToken();

        const headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
            ...options.headers
        };

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        try {

            const response = await fetch(this.baseURL + endpoint, {
                ...options,
                headers,
                signal: controller.signal
            });

            clearTimeout(timeout);

            let data = null;

            const contentType = response.headers.get("content-type");

            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
            }

            if (!response.ok) {

                switch (response.status) {

                    case 400:
                        throw new Error(data?.message || "Bad Request");

                    case 401:

                        clearAuth();

                        window.location.href = "/login.html";

                        throw new Error("Unauthorized");

                    case 403:
                        throw new Error(data?.message || "Forbidden");

                    case 404:
                        throw new Error(data?.message || "Resource Not Found");

                    case 422:
                        throw new Error(data?.message || "Validation Error");

                    case 500:
                        throw new Error(data?.message || "Internal Server Error");

                    default:
                        throw new Error(data?.message || "Unknown Error");

                }

            }

            return data;

        }

        catch (error) {

            clearTimeout(timeout);

            if (error.name === "AbortError") {
                throw new Error("Request Timeout");
            }

            throw error;

        }

    }

    get(endpoint) {

        return this.request(endpoint, {
            method: "GET"
        });

    }

    post(endpoint, body) {

        return this.request(endpoint, {
            method: "POST",
            body: JSON.stringify(body)
        });

    }

    put(endpoint, body) {

        return this.request(endpoint, {
            method: "PUT",
            body: JSON.stringify(body)
        });

    }

    patch(endpoint, body) {

        return this.request(endpoint, {
            method: "PATCH",
            body: JSON.stringify(body)
        });

    }

    delete(endpoint) {

        return this.request(endpoint, {
            method: "DELETE"
        });

    }

    async upload(endpoint, formData) {

        const controller = new AbortController();

        const timeout = setTimeout(() => {

            controller.abort();

        }, this.timeout);

        const token = getToken();

        const headers = {};

        if (token) {

            headers.Authorization = `Bearer ${token}`;

        }

        try {

            const response = await fetch(this.baseURL + endpoint, {

                method: "POST",

                headers,

                body: formData,

                signal: controller.signal

            });

            clearTimeout(timeout);

            const data = await response.json();

            if (!response.ok) {

                throw new Error(data.message || "Upload Failed");

            }

            return data;

        }

        catch (error) {

            clearTimeout(timeout);

            if (error.name === "AbortError") {

                throw new Error("Upload Timeout");

            }

            throw error;

        }

    }

}

const api = new API();

export default api;