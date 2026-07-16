import { getCurrentUser, logout } from "../api/auth.api.js";
import { removeToken } from "../utils/token.js";

class Navbar {

    constructor() {
        this.user = null;
    }

    async render() {

        try {

            this.user = await getCurrentUser();

            const navbar = document.getElementById("navbar");

            if (!navbar) return;

            navbar.innerHTML = `
            
<header class="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">

    <div class="flex items-center gap-4">

        <button
            id="sidebarToggle"
            class="p-2 rounded hover:bg-gray-100">

            <span class="material-symbols-outlined">
                menu
            </span>

        </button>

        <h1 class="text-xl font-semibold text-gray-800">

            ${document.title}

        </h1>

    </div>


    <div class="flex items-center gap-5">

        <button
            class="relative p-2 rounded hover:bg-gray-100">

            <span class="material-symbols-outlined">

                notifications

            </span>

            <span
                id="notificationBadge"
                class="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-600 hidden">
            </span>

        </button>



        <div class="relative">

            <button
                id="userMenuBtn"
                class="flex items-center gap-3">

                <img

                    src="${this.user.avatar || "/assets/images/default-avatar.png"}"

                    class="w-10 h-10 rounded-full object-cover border"

                >

                <div class="text-left">

                    <p class="font-semibold">

                        ${this.user.name}

                    </p>

                    <p class="text-xs text-gray-500">

                        ${this.user.role}

                    </p>

                </div>

            </button>


            <div

                id="userDropdown"

                class="hidden absolute right-0 mt-3 w-60 bg-white rounded-lg shadow-lg border overflow-hidden z-50">

                <button

                    id="profileBtn"

                    class="w-full text-left px-4 py-3 hover:bg-gray-50">

                    My Profile

                </button>


                <button

                    id="settingsBtn"

                    class="w-full text-left px-4 py-3 hover:bg-gray-50">

                    Settings

                </button>

                <hr>

                <button

                    id="logoutBtn"

                    class="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50">

                    Logout

                </button>

            </div>

        </div>

    </div>

</header>

`;

            this.events();

        } catch (error) {

            removeToken();

            window.location.href = "/login.html";

        }

    }

    events() {

        const menuBtn = document.getElementById("userMenuBtn");
        const dropdown = document.getElementById("userDropdown");

        menuBtn.addEventListener("click", () => {

            dropdown.classList.toggle("hidden");

        });

        document.addEventListener("click", (e) => {

            if (!menuBtn.contains(e.target) &&
                !dropdown.contains(e.target)) {

                dropdown.classList.add("hidden");

            }

        });

        document
            .getElementById("logoutBtn")
            .addEventListener("click", async () => {

                await logout();

            });

    }

}

export default new Navbar();