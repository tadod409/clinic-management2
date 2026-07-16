// ================================
// Dashboard Controller
// ================================

document.addEventListener("DOMContentLoaded", async () => {

    try {

        Loader.show();

        // التحقق من تسجيل الدخول
        const token = Token.get();

        if (!token) {
            window.location.href = "../login/login.html";
            return;
        }

        // إنشاء مكونات الصفحة
        Sidebar.render("dashboard");

        Navbar.init();

        Breadcrumb.set([
            { title: "Home", url: "#" },
            { title: "Dashboard" }
        ]);

        // تحميل البيانات
        await loadProfile();

        await loadStatistics();

        await loadAppointments();

        await loadChart();

        // عرض التاريخ الحالي
        document.getElementById("todayDate").textContent =
            new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            });

    } catch (error) {

        console.error(error);

        Toast.error("Failed to load dashboard.");

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

    document.getElementById("welcomeTitle").textContent =
        `Good Morning, ${doctor.name}`;

}

// ================================
// Statistics
// ================================

async function loadStatistics() {

    const stats = await DashboardAPI.statistics();

    document.getElementById("todayAppointments").textContent =
        stats.todayAppointments;

    document.getElementById("pendingReports").textContent =
        stats.pendingReports;

    document.getElementById("totalPatients").textContent =
        stats.totalPatients;

    document.getElementById("newMessages").textContent =
        stats.newMessages;

}

// ================================
// Appointments
// ================================

async function loadAppointments() {

    const appointments = await DashboardAPI.appointments();

    Table.render({

        target: "#appointmentsTable",

        data: appointments,

        columns: [
            "time",
            "patient",
            "reason",
            "status"
        ]

    });

}

// ================================
// Chart
// ================================

async function loadChart() {

    const chart = await DashboardAPI.chart();

    renderChart(chart);

}

// ================================
// Logout
// ================================

function logout() {

    Token.remove();

    window.location.href = "../login/login.html";

}