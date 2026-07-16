// ==========================================
// components/sidebar.js
// MediCare Premium
// Reusable Sidebar Component
// ==========================================

import { logout } from "../api/auth.api.js";

export default class Sidebar {

    constructor(options = {}) {

        this.container = options.container;
        this.user = options.user || {};

        this.render();

        this.activateCurrentPage();

        this.registerEvents();

    }

    render() {

        this.container.innerHTML = `
        <aside id="sidebar"
        class="fixed left-0 top-0 h-screen w-72 bg-white border-r border-gray-200 flex flex-col">

            <div class="h-20 flex items-center px-6 border-b">

                <span class="material-symbols-outlined text-blue-700 text-3xl">
                medical_services
                </span>

                <span class="ml-3 text-xl font-bold">
                    MediCare Premium
                </span>

            </div>

            <div class="p-5 border-b">

                <h3 id="sidebar-user-name"
                class="font-semibold">

                ${this.user.full_name || "Loading..."}

                </h3>

                <p
                id="sidebar-user-role"
                class="text-sm text-gray-500">

                ${this.user.role || ""}

                </p>

            </div>

            <nav class="flex-1 overflow-y-auto py-4">

                ${this.menu()}

            </nav>

            <div class="border-t p-5">

                <button
                id="logoutBtn"
                class="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg py-2">

                    Logout

                </button>

            </div>

        </aside>
        `;

    }

    menu(){

        return `

<a class="sidebar-link" href="/dashboard.html">
Dashboard
</a>

<a class="sidebar-link" href="/patients.html">
Patients
</a>

<a class="sidebar-link" href="/appointments.html">
Appointments
</a>

<a class="sidebar-link" href="/medical-history.html">
Medical History
</a>

<a class="sidebar-link" href="/radiology.html">
Radiology
</a>

<a class="sidebar-link" href="/billing.html">
Billing
</a>

<a class="sidebar-link" href="/reports.html">
Reports
</a>

<a class="sidebar-link" href="/settings.html">
Settings
</a>

`;

    }

    activateCurrentPage(){

        const current = location.pathname.split("/").pop();

        document.querySelectorAll(".sidebar-link")
        .forEach(link=>{

            const href = link.getAttribute("href");

            if(href.includes(current)){

                link.classList.add(
                    "bg-blue-700",
                    "text-white",
                    "rounded-lg",
                    "px-4",
                    "py-2"
                );

            }else{

                link.classList.add(
                    "block",
                    "px-4",
                    "py-2",
                    "hover:bg-gray-100",
                    "rounded-lg"
                );

            }

        });

    }

    registerEvents(){

        document
        .getElementById("logoutBtn")
        ?.addEventListener("click",async()=>{

            await logout();

        });

    }

}