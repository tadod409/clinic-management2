// ================================
// Reports Controller
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
        Sidebar.render("reports");

        Navbar.init();

        Breadcrumb.set([
            { title: "Home", url: "../dashboard/dashboard.html" },
            { title: "Reports" }
        ]);

        // تحميل بيانات المستخدم
        await loadProfile();

        // تحميل التقارير
        await loadReports();

    } catch (error) {

        console.error(error);

        Toast.error("Failed to load reports.");

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

    document.getElementById("doctorName").textContent = doctor.name;

    document.getElementById("doctorSpecialty").textContent = doctor.specialty;

    document.getElementById("branchName").textContent = doctor.branch;

    document.getElementById("doctorAvatar").src =
        doctor.avatar || "/assets/images/avatar-placeholder.png";

}


// ================================
// Load Reports
// ================================

async function loadReports() {

    try {

        Loader.show();

        const reportType =
            document.getElementById("reportType")?.value || "";

        const fromDate =
            document.getElementById("fromDate")?.value || "";

        const toDate =
            document.getElementById("toDate")?.value || "";

        const data = await ReportsAPI.dashboard({

            reportType,
            fromDate,
            toDate

        });

        document.getElementById("totalAppointments").textContent =
            data.totalAppointments ?? 0;

        document.getElementById("totalPatients").textContent =
            data.totalPatients ?? 0;

        document.getElementById("totalDoctors").textContent =
            data.totalDoctors ?? 0;

        document.getElementById("totalRevenue").textContent =
            data.totalRevenue ?? 0;

    } catch (error) {

        console.error(error);

        Toast.error("Unable to load reports.");

    } finally {

        Loader.hide();

    }

}


// ================================
// Export Reports
// ================================

async function exportPDF() {

    await ReportsAPI.exportPDF();

    Toast.success("PDF report generated.");

}

async function exportExcel() {

    await ReportsAPI.exportExcel();

    Toast.success("Excel report generated.");

}

async function exportCSV() {

    await ReportsAPI.exportCSV();

    Toast.success("CSV report generated.");

}