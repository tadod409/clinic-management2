// =====================================
// Patient Details Controller
// =====================================

let patientId = null;

document.addEventListener("DOMContentLoaded", async () => {

    try {

        Loader.show();

        const token = Token.get();

        if (!token) {

            window.location.href =
                "../login/login.html";

            return;

        }

        patientId =
            new URLSearchParams(window.location.search)
                .get("id");

        if (!patientId) {

            Toast.error("Patient not found.");

            window.location.href =
                "../patients/patients.html";

            return;

        }

        Sidebar.render("patients");

        Navbar.init();

        Breadcrumb.set([
            {
                title: "Home",
                url: "../dashboard/dashboard.html"
            },
            {
                title: "Patients",
                url: "../patients/patients.html"
            },
            {
                title: "Patient Details"
            }
        ]);

        await loadProfile();

        await loadPatient();

        await loadMedicalHistory();

        await loadAppointments();

        await loadPrescriptions();

    }

    catch (error) {

        console.error(error);

        Toast.error("Failed to load patient.");

    }

    finally {

        Loader.hide();

    }

});

// =====================================
// Doctor Profile
// =====================================

async function loadProfile() {

    const response = await AuthAPI.me();

    if (!response.success) {

        Token.remove();

        window.location.href =
            "../login/login.html";

        return;

    }

    const doctor = response.data;

    doctorName.textContent =
        doctor.name;

    doctorSpecialty.textContent =
        doctor.specialty;

    branchName.textContent =
        doctor.branch;

    doctorAvatar.src =
        doctor.avatar ||
        "/assets/images/avatar-placeholder.png";

}

// =====================================
// Patient Information
// =====================================

async function loadPatient() {

    const patient =
        await PatientsAPI.get(patientId);

    patientPhoto.src =
        patient.photo ||
        "/assets/images/avatar-placeholder.png";

    patientName.textContent =
        patient.name;

    patientId.textContent =
        patient.id;

    patientAge.textContent =
        patient.age;

    patientGender.textContent =
        patient.gender;

    patientBlood.textContent =
        patient.bloodType;

    patientHeight.textContent =
        patient.height + " cm";

    patientWeight.textContent =
        patient.weight + " kg";

    patientBMI.textContent =
        patient.bmi;

    patientPhone.textContent =
        patient.phone;

    patientEmail.textContent =
        patient.email;

}

// =====================================
// Medical History
// =====================================

async function loadMedicalHistory() {

    const history =
        await PatientsAPI.medicalHistory(patientId);

    medicalHistory.innerHTML =
        history.history;

    chronicDiseases.innerHTML =
        history.chronicDiseases.join("<br>");

    allergies.innerHTML =
        history.allergies.join("<br>");

    medications.innerHTML =
        history.currentMedications.join("<br>");

}

// =====================================
// Appointments
// =====================================

async function loadAppointments() {

    const appointments =
        await PatientsAPI.appointments(patientId);

    Table.render({

        target: "#appointmentsTable",

        data: appointments,

        columns: [
            "date",
            "doctor",
            "reason",
            "status"
        ]

    });

}

// =====================================
// Prescriptions
// =====================================

async function loadPrescriptions() {

    const prescriptions =
        await PatientsAPI.prescriptions(patientId);

    Table.render({

        target: "#prescriptionsTable",

        data: prescriptions,

        columns: [
            "date",
            "medication",
            "dosage",
            "doctor"
        ]

    });

}

// =====================================
// Edit Patient
// =====================================

function editPatient() {

    Modal.open("editPatient", {

        id: patientId

    });

}