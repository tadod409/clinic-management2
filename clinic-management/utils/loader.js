/**
 * ============================================================
 * MediCare Premium
 * Enterprise Loader System
 * Version: 1.0
 * ============================================================
 */

class Loader {

    constructor() {

        this.overlay = document.getElementById("global-loader");

        if (!this.overlay) {

            this.overlay = document.createElement("div");

            this.overlay.id = "global-loader";

            this.overlay.className = `
                fixed inset-0
                bg-black/30
                backdrop-blur-sm
                hidden
                items-center
                justify-center
                z-[99999]
            `;

            this.overlay.innerHTML = `

                <div class="bg-white rounded-xl shadow-2xl p-8 flex flex-col items-center gap-4">

                    <div class="loader-spinner"></div>

                    <p class="text-sm font-medium text-gray-700" id="loader-message">
                        Loading...
                    </p>

                </div>

            `;

            document.body.appendChild(this.overlay);

            this.createSpinnerStyle();

        }

    }

    createSpinnerStyle() {

        if (document.getElementById("loader-style")) return;

        const style = document.createElement("style");

        style.id = "loader-style";

        style.innerHTML = `

            .loader-spinner{

                width:60px;

                height:60px;

                border:6px solid #e5e7eb;

                border-top:6px solid #003d9b;

                border-radius:50%;

                animation:loader-spin .8s linear infinite;

            }

            @keyframes loader-spin{

                from{

                    transform:rotate(0deg);

                }

                to{

                    transform:rotate(360deg);

                }

            }

        `;

        document.head.appendChild(style);

    }

    show(message = "Loading...") {

        const label = document.getElementById("loader-message");

        if (label) {

            label.textContent = message;

        }

        this.overlay.classList.remove("hidden");

        this.overlay.classList.add("flex");

    }

    hide() {

        this.overlay.classList.remove("flex");

        this.overlay.classList.add("hidden");

    }

    async wrap(callback, message = "Loading...") {

        this.show(message);

        try {

            return await callback();

        }

        finally {

            this.hide();

        }

    }

}

export default new Loader();