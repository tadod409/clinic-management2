/**
 * ============================================================
 * MediCare Premium
 * Enterprise Toast Notification System
 * Version: 1.0
 * ============================================================
 */

class Toast {

    constructor() {

        this.container = document.getElementById("toast-container");

        if (!this.container) {

            this.container = document.createElement("div");

            this.container.id = "toast-container";

            this.container.className = "fixed top-5 right-5 z-[99999] flex flex-col gap-3";

            document.body.appendChild(this.container);

        }

    }

    success(message, duration = 4000) {

        this.create(message, "success", "check_circle", duration);

    }

    error(message, duration = 5000) {

        this.create(message, "error", "error", duration);

    }

    warning(message, duration = 5000) {

        this.create(message, "warning", "warning", duration);

    }

    info(message, duration = 4000) {

        this.create(message, "info", "info", duration);

    }

    create(message, type, icon, duration) {

        const colors = {

            success: {
                bg: "#ecfdf5",
                border: "#10b981",
                color: "#065f46"
            },

            error: {
                bg: "#fef2f2",
                border: "#dc2626",
                color: "#991b1b"
            },

            warning: {
                bg: "#fffbeb",
                border: "#f59e0b",
                color: "#92400e"
            },

            info: {
                bg: "#eff6ff",
                border: "#2563eb",
                color: "#1d4ed8"
            }

        };

        const style = colors[type];

        const toast = document.createElement("div");

        toast.style.background = style.bg;
        toast.style.borderLeft = `5px solid ${style.border}`;
        toast.style.color = style.color;

        toast.className =
            "relative min-w-[340px] max-w-[420px] rounded-lg shadow-xl overflow-hidden transition-all duration-300";

        toast.innerHTML = `
        
        <div class="flex items-center gap-3 p-4">

            <span class="material-symbols-outlined">${icon}</span>

            <div class="flex-1">

                <div class="font-semibold capitalize">

                    ${type}

                </div>

                <div class="text-sm mt-1">

                    ${message}

                </div>

            </div>

            <button class="close-btn">

                <span class="material-symbols-outlined">

                    close

                </span>

            </button>

        </div>

        <div class="progress"></div>

        `;

        const progress = toast.querySelector(".progress");

        progress.style.height = "4px";
        progress.style.background = style.border;
        progress.style.width = "100%";
        progress.style.transition = `width ${duration}ms linear`;

        this.container.appendChild(toast);

        requestAnimationFrame(() => {

            progress.style.width = "0%";

        });

        const removeToast = () => {

            toast.style.opacity = "0";

            toast.style.transform = "translateX(50px)";

            setTimeout(() => {

                toast.remove();

            }, 300);

        };

        toast.querySelector(".close-btn").onclick = removeToast;

        setTimeout(removeToast, duration);

    }

}

export default new Toast();