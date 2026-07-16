// ================================
// Medical Records Controller
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

        // إنشاء المكونات
        Sidebar.render("medical-records");

        Navbar.init();

        Breadcrumb.set([
            { title: "Home", url: "../dashboard/dashboard.html" },
            { title: "Medical Records" }
        ]);

        // تحميل بيانات المستخدم
        await loadProfile();

        // تحميل السجلات
        await loadMedicalRecords();

    } catch (error) {

        console.error(error);

        Toast.error("Failed to load medical records.");

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
// Load Records
// ================================

async function loadMedicalRecords(page = 1) {

    try {

        Loader.show();

        const search =
            document.getElementById("searchRecord")?.value || "";

        const patient =
            document.getElementById("patientFilter")?.value || "";

        const response =
            await MedicalRecordsAPI.getAll({

                page,
                search,
                patient

            });

        Table.render({

            target: "#medicalRecordsTable",

            data: response.data,

            columns: [
                "id",
                "patient",
                "doctor",
                "diagnosis",
                "visitDate",
                "status"
            ]

        });

        Pagination.render({

            target: "#medicalRecordsPagination",

            page: response.page,

            pages: response.pages,

            onChange: loadMedicalRecords

        });

    } catch (error) {

        console.error(error);

        Toast.error("Unable to load medical records.");

    } finally {

        Loader.hide();

    }

}


// ================================
// CRUD
// ================================

async function addMedicalRecord(data) {

    const response =
        await MedicalRecordsAPI.create(data);

    if (response.success) {

        Toast.success("Medical record created.");

        loadMedicalRecords();

    }

}

async function editMedicalRecord(id, data) {

    const response =
        await MedicalRecordsAPI.update(id, data);

    if (response.success) {

        Toast.success("Medical record updated.");

        loadMedicalRecords();

    }

}

async function deleteMedicalRecord(id) {

    if (!confirm("Delete this medical record?")) return;

    const response =
        await MedicalRecordsAPI.delete(id);

    if (response.success) {

        Toast.success("Medical record deleted.");

        loadMedicalRecords();

    }

}


// ================================
// Attachments
// ================================

async function uploadAttachment(recordId, file) {

    const response =
        await MedicalRecordsAPI.uploadAttachment(recordId, file);

    if (response.success) {

        Toast.success("Attachment uploaded.");

        loadMedicalRecords();

    }

}

async function deleteAttachment(recordId, attachmentId) {

    const response =
        await MedicalRecordsAPI.deleteAttachment(recordId, attachmentId);

    if (response.success) {

        Toast.success("Attachment removed.");

        loadMedicalRecords();

    }

}