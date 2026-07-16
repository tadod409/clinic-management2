// ================================
// Prescriptions Controller
// ================================

document.addEventListener("DOMContentLoaded", async () => {

    try {

        Loader.show();

        const token = Token.get();

        if (!token) {

            window.location.href =
                "../login/login.html";

            return;

        }

        Sidebar.render("prescriptions");

        Navbar.init();

        Breadcrumb.set([
            { title: "Home", url: "../dashboard/dashboard.html" },
            { title: "Prescriptions" }
        ]);

        await loadProfile();

        await loadStatistics();

        await loadPrescriptions();

        bindEvents();

    } catch (error) {

        console.error(error);

        Toast.error("Failed to load prescriptions.");

    } finally {

        Loader.hide();

    }

});


// ================================
// Load Profile
// ================================

async function loadProfile() {

    const response = await AuthAPI.me();

    if (!response.success) {

        Token.remove();

        window.location.href =
            "../login/login.html";

        return;

    }

    const doctor = response.data;

    document.getElementById("doctorName").textContent =
        doctor.name;

    document.getElementById("doctorSpecialty").textContent =
        doctor.specialty;

    document.getElementById("branchName").textContent =
        doctor.branch;

    document.getElementById("doctorAvatar").src =
        doctor.avatar ||
        "/assets/images/avatar-placeholder.png";

}


// ================================
// Statistics
// ================================

async function loadStatistics() {

    const stats =
        await PrescriptionsAPI.statistics();

    document.getElementById("totalPrescriptions").textContent =
        stats.total;

    document.getElementById("todayPrescriptions").textContent =
        stats.today;

    document.getElementById("pendingPrescriptions").textContent =
        stats.pending;

    document.getElementById("renewedPrescriptions").textContent =
        stats.renewed;

}


// ================================
// Table
// ================================

async function loadPrescriptions(page = 1) {

    Loader.show();

    try {

        const filters = {

            patient:
                document.getElementById("searchPatient").value,

            doctor:
                document.getElementById("searchDoctor").value,

            medicine:
                document.getElementById("searchMedicine").value,

            status:
                document.getElementById("statusFilter").value,

            fromDate:
                document.getElementById("fromDate").value,

            toDate:
                document.getElementById("toDate").value,

            page

        };

        const response =
            await PrescriptionsAPI.list(filters);

        Table.render({

            target: "#prescriptionsTable",

            data: response.data,

            columns: [

                "id",

                "patient",

                "doctor",

                "medicines",

                "date",

                "status"

            ],

            actions: [

                "view",

                "edit",

                "print",

                "delete"

            ]

        });

        Pagination.render({

            target: "#prescriptionsPagination",

            currentPage: response.page,

            totalPages: response.totalPages,

            onChange: loadPrescriptions

        });

    } catch (error) {

        console.error(error);

        Toast.error("Unable to load prescriptions.");

    } finally {

        Loader.hide();

    }

}


// ================================
// Events
// ================================

function bindEvents() {

    document
        .getElementById("searchPatient")
        .addEventListener("keyup", () => loadPrescriptions());

    document
        .getElementById("statusFilter")
        .addEventListener("change", () => loadPrescriptions());

}


// ================================
// Actions
// ================================

function viewPrescription(id) {

    window.location.href =
        `view.html?id=${id}`;

}

function editPrescription(id) {

    window.location.href =
        `edit.html?id=${id}`;

}

async function deletePrescription(id) {

    if (!confirm("Delete this prescription?"))
        return;

    const response =
        await PrescriptionsAPI.delete(id);

    if (response.success) {

        Toast.success("Prescription deleted.");

        loadPrescriptions();

    } else {

        Toast.error(response.message);

    }

}

function printPrescription(id) {

    window.open(

        `print.html?id=${id}`,

        "_blank"

    );

}