// ================================
// Patients Controller
// ================================

document.addEventListener("DOMContentLoaded", async () => {

    try {

        Loader.show();

        const token = Token.get();

        if (!token) {
            window.location.href = "../login/login.html";
            return;
        }

        Sidebar.render("patients");

        Navbar.init();

        Breadcrumb.set([
            { title: "Home", url: "../dashboard/dashboard.html" },
            { title: "Patients" }
        ]);

        await loadProfile();

        await loadPatients();

    } catch (error) {

        console.error(error);

        Toast.error("Failed to load patients.");

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
// Patients
// ================================

async function loadPatients(page = 1) {

    Loader.show();

    try {

        const response = await PatientsAPI.list({

            page,

            search:
                document.getElementById("searchPatient").value,

            gender:
                document.getElementById("genderFilter").value,

            status:
                document.getElementById("statusFilter").value

        });

        Table.render({

            target: "#patientsTable",

            data: response.data,

            columns: [
                "id",
                "name",
                "gender",
                "age",
                "phone",
                "status"
            ],

            actions: [

                {
                    icon: "visibility",
                    onclick: (row) => viewPatient(row.id)
                },

                {
                    icon: "edit",
                    onclick: (row) => editPatient(row.id)
                },

                {
                    icon: "delete",
                    onclick: (row) => deletePatient(row.id)
                }

            ]

        });

        Pagination.render({

            target: "#patientsPagination",

            page: response.page,

            totalPages: response.totalPages,

            onChange: loadPatients

        });

    } catch (error) {

        console.error(error);

        Toast.error("Failed to load patients.");

    } finally {

        Loader.hide();

    }

}

// ================================
// Actions
// ================================

function viewPatient(id) {

    window.location.href =
        `../patient-details/patient-details.html?id=${id}`;

}

function editPatient(id) {

    Modal.open("editPatient", { id });

}

async function deletePatient(id) {

    const confirmed = confirm("Delete this patient?");

    if (!confirmed) return;

    try {

        await PatientsAPI.delete(id);

        Toast.success("Patient deleted.");

        loadPatients();

    } catch (error) {

        console.error(error);

        Toast.error("Delete failed.");

    }

}