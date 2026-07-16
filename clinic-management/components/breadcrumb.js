class Breadcrumb {

    constructor() {
        this.routes = {
            dashboard: "Dashboard",
            patients: "Patients",
            "patient-profile": "Patient Profile",
            appointments: "Appointments",
            visits: "Visits",
            "medical-history": "Medical History",
            radiology: "Radiology",
            laboratory: "Laboratory",
            billing: "Billing",
            invoices: "Invoices",
            reports: "Reports",
            users: "Users",
            settings: "Settings",
            profile: "Profile"
        };
    }

    render(options = {}) {

        const container = document.getElementById("breadcrumb");

        if (!container) return;

        const fileName = window.location.pathname
            .split("/")
            .pop()
            .replace(".html", "");

        const pageTitle =
            options.title ||
            this.routes[fileName] ||
            "Page";

        const parent =
            options.parent ||
            "Home";

        container.innerHTML = `

<nav
    class="flex items-center text-sm text-gray-500 gap-2"
    aria-label="Breadcrumb">

    <a
        href="/pages/dashboard/dashboard.html"
        class="hover:text-blue-600 transition">

        ${parent}

    </a>

    <span>/</span>

    <span
        class="font-semibold text-gray-900">

        ${pageTitle}

    </span>

</nav>

`;

        document.title = `MediCare Premium | ${pageTitle}`;

    }

    setTitle(title) {

        this.render({

            title

        });

    }

    set(parent, title) {

        this.render({

            parent,

            title

        });

    }

}

export default new Breadcrumb();