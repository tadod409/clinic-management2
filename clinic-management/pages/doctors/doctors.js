// ================================
// Doctors Controller
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
        Sidebar.render("doctors");

        Navbar.init();

        Breadcrumb.set([
            { title: "Home", url: "../dashboard/dashboard.html" },
            { title: "Doctors" }
        ]);

        // تحميل بيانات المستخدم
        await loadProfile();

        // تحميل الأطباء
        await loadDoctors();

    } catch (error) {

        console.error(error);

        Toast.error("Failed to load doctors.");

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
// Doctors Table
// ================================

async function loadDoctors(page = 1) {

    try {

        Loader.show();

        const search =
            document.getElementById("searchDoctor")?.value || "";

        const specialty =
            document.getElementById("specialtyFilter")?.value || "";

        const status =
            document.getElementById("statusFilter")?.value || "";

        const response = await DoctorsAPI.getAll({

            page,
            search,
            specialty,
            status

        });

        Table.render({

            target: "#doctorsTable",

            data: response.data,

            columns: [
                "id",
                "name",
                "specialty",
                "phone",
                "email",
                "status"
            ]

        });

        Pagination.render({

            target: "#doctorsPagination",

            page: response.page,

            pages: response.pages,

            onChange: loadDoctors

        });

    } catch (error) {

        console.error(error);

        Toast.error("Unable to load doctors.");

    } finally {

        Loader.hide();

    }

}


// ================================
// CRUD
// ================================

async function addDoctor(data) {

    const response = await DoctorsAPI.create(data);

    if (response.success) {

        Toast.success("Doctor added successfully.");

        loadDoctors();

    }

}

async function editDoctor(id, data) {

    const response = await DoctorsAPI.update(id, data);

    if (response.success) {

        Toast.success("Doctor updated.");

        loadDoctors();

    }

}

async function deleteDoctor(id) {

    if (!confirm("Delete this doctor?")) return;

    const response = await DoctorsAPI.delete(id);

    if (response.success) {

        Toast.success("Doctor deleted.");

        loadDoctors();

    }

}