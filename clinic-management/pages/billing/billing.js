// ================================
// Billing Controller
// ================================

document.addEventListener("DOMContentLoaded", async () => {

    try {

        Loader.show();

        const token = Token.get();

        if (!token) {

            window.location.href = "../login/login.html";
            return;

        }

        Sidebar.render("billing");

        Navbar.init();

        Breadcrumb.set([
            { title: "Home", url: "../dashboard/dashboard.html" },
            { title: "Billing" }
        ]);

        await loadProfile();

        await loadStatistics();

        await loadBills();

    } catch (error) {

        console.error(error);

        Toast.error("Failed to load billing.");

    } finally {

        Loader.hide();

    }

});


// ================================
// Profile
// ================================

async function loadProfile() {

    const response = await AuthAPI.me();

    if (!response.success) {

        Token.remove();

        window.location.href = "../login/login.html";

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
        doctor.avatar || "/assets/images/avatar-placeholder.png";

}


// ================================
// Statistics
// ================================

async function loadStatistics() {

    const stats = await BillingAPI.statistics();

    document.getElementById("totalInvoices").textContent =
        stats.totalInvoices ?? 0;

    document.getElementById("paidInvoices").textContent =
        stats.paidInvoices ?? 0;

    document.getElementById("pendingInvoices").textContent =
        stats.pendingInvoices ?? 0;

    document.getElementById("totalRevenue").textContent =
        stats.totalRevenue ?? 0;

}


// ================================
// Bills Table
// ================================

async function loadBills(page = 1) {

    try {

        Loader.show();

        const search =
            document.getElementById("searchBilling")?.value || "";

        const status =
            document.getElementById("statusFilter")?.value || "";

        const response = await BillingAPI.getAll({

            page,
            search,
            status

        });

        Table.render({

            target: "#billingTable",

            data: response.data,

            columns: [
                "invoiceNumber",
                "patient",
                "amount",
                "paymentMethod",
                "status",
                "date"
            ]

        });

        Pagination.render({

            target: "#billingPagination",

            page: response.page,

            pages: response.pages,

            onChange: loadBills

        });

    } catch (error) {

        console.error(error);

        Toast.error("Unable to load invoices.");

    } finally {

        Loader.hide();

    }

}


// ================================
// CRUD
// ================================

async function addInvoice(data) {

    const response = await BillingAPI.create(data);

    if (response.success) {

        Toast.success("Invoice created.");

        loadBills();

    }

}

async function editInvoice(id, data) {

    const response = await BillingAPI.update(id, data);

    if (response.success) {

        Toast.success("Invoice updated.");

        loadBills();

    }

}

async function deleteInvoice(id) {

    if (!confirm("Delete this invoice?")) return;

    const response = await BillingAPI.delete(id);

    if (response.success) {

        Toast.success("Invoice deleted.");

        loadBills();

    }

}

async function payInvoice(id, data) {

    const response = await BillingAPI.pay(id, data);

    if (response.success) {

        Toast.success("Payment completed.");

        loadBills();

    }

}

async function refundInvoice(id, data) {

    const response = await BillingAPI.refund(id, data);

    if (response.success) {

        Toast.success("Refund completed.");

        loadBills();

    }

}