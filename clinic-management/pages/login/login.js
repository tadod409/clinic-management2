/**
 * ============================================================
 * MediCare Premium
 * Login Page Controller
 * Version: 1.0
 * ============================================================
 */

import AuthAPI from "../../api/auth.api.js";
import Validator from "../../utils/validator.js";
import Loader from "../../utils/loader.js";
import Toast from "../../utils/toast.js";

import {
    saveToken,
    saveUser,
    saveRememberMe,
    clearAuth,
    isAuthenticated
} from "../../utils/token.js";

class LoginController {

    constructor() {

        this.form = document.querySelector("#loginForm");

        this.emailInput = document.querySelector("#identifier");

        this.passwordInput = document.querySelector("#password");

        this.submitButton = document.querySelector("#submitBtn");

        this.errorBox = document.querySelector("#error-message");

        this.isSubmitting = false;

        this.initialize();

    }

    initialize() {

        if (isAuthenticated()) {

            window.location.replace("/dashboard.html");

            return;

        }

        clearAuth();

        this.form.addEventListener(

            "submit",

            this.handleLogin.bind(this)

        );

        this.emailInput.addEventListener(

            "input",

            () => this.clearError()

        );

        this.passwordInput.addEventListener(

            "input",

            () => this.clearError()

        );

    }

    async handleLogin(event) {

        event.preventDefault();

        if (this.isSubmitting) return;

        this.clearError();

        const email = Validator.sanitize(

            this.emailInput.value

        );

        const password = this.passwordInput.value;

        const validation = Validator.validateLogin(

            email,

            password

        );

        if (!validation.valid) {

            if (validation.errors.email) {

                return this.showError(

                    validation.errors.email

                );

            }

            if (validation.errors.password) {

                return this.showError(

                    validation.errors.password

                );

            }

        }

        this.isSubmitting = true;

        this.disableButton();

        try {

            Loader.show("Authenticating...");

            const response = await AuthAPI.login(

                email,

                password

            );

            saveToken(response.token);

            saveUser(response.user);

            saveRememberMe(true);

            Toast.success(

                `Welcome ${response.user.name}`

            );

            setTimeout(() => {

                window.location.replace(

                    "/dashboard.html"

                );

            }, 500);

        }

        catch (error) {

            this.showError(

                error.message ||

                "Login failed."

            );

            Toast.error(

                error.message ||

                "Login failed."

            );

        }

        finally {

            Loader.hide();

            this.enableButton();

            this.passwordInput.value = "";

            this.isSubmitting = false;

        }

    }

    disableButton() {

        this.submitButton.disabled = true;

        this.submitButton.innerHTML = `

            <span class="material-symbols-outlined animate-spin">

                autorenew

            </span>

            Signing In...

        `;

    }

    enableButton() {

        this.submitButton.disabled = false;

        this.submitButton.innerHTML = `

            <span class="material-symbols-outlined">

                login

            </span>

            Secure Login

        `;

    }

    showError(message) {

        this.errorBox.textContent = message;

        this.errorBox.classList.remove("hidden");

    }

    clearError() {

        this.errorBox.textContent = "";

        this.errorBox.classList.add("hidden");

    }

}

new LoginController();