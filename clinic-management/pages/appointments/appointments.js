// =====================================
// Appointments Controller
// =====================================

document.addEventListener("DOMContentLoaded", async () => {

    try {

        Loader.show();

        const token = Token.get();

        if (!token) {

            window.location.href =
                "../login/login.html";

            return;

        }

        Sidebar.render("appointments");

        Navbar.init();

        Breadcrumb.set([
            {
                title: "Home",
                url: "../dashboard/dashboard.html"
            },
            {
                title: "Appointments"
            }
        ]);

        await loadProfile();

        await loadDoctors();

        await loadAppointments();

    }

    catch (error) {

        console.error(error);

        Toast.error("Failed to load appointments.");

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
// Doctors List
// =====================================

async function loadDoctors() {

    const doctors =
        await AppointmentsAPI.doctors();

    const select =
        document.getElementById("doctorFilter");

    select.innerHTML =
        `<option value="">All Doctors</option>`;

    doctors.forEach(doctor => {

        select.innerHTML += `

            <option value="${doctor.id}">

                ${doctor.name}

            </option>

        `;

    });

}

// =====================================
// Appointments
// =====================================

async function loadAppointments(page = 1) {

    Loader.show();

    try {

        const response =
            await AppointmentsAPI.list({

                page,

                search:
                    document.getElementById("searchAppointment").value,

                date:
                    document.getElementById("appointmentDate").value,

                status:
                    document.getElementById("statusFilter").value,

                doctor:
                    document.getElementById("doctorFilter").value

            });

        Table.render({

            target: "#appointmentsTable",

            data: response.data,

            columns: [

                "id",

                "patient",

                "doctor",

                "date",

                "time",

                "reason",

                "status"

            ],

            actions: [

                {

                    icon: "visibility",

                    onclick: row =>
                        viewAppointment(row.id)

                },

                {

                    icon: "edit",

                    onclick: row =>
                        editAppointment(row.id)

                },

                {

                    icon: "delete",

                    onclick: row =>
                        deleteAppointment(row.id)

                }

            ]

        });

        Pagination.render({

            target:
                "#appointmentsPagination",

            page:
                response.page,

            totalPages:
                response.totalPages,

            onChange:
                loadAppointments

        });

    }

    catch (error) {

        console.error(error);

        Toast.error("Failed to load appointments.");

    }

    finally {

        Loader.hide();

    }

}

// =====================================
// Actions
// =====================================

function viewAppointment(id) {

    window.location.href =
        `../appointment-details/appointment-details.html?id=${id}`;

}

function editAppointment(id) {

    Modal.open("appointment", {

        id

    });

}

async function deleteAppointment(id) {

    const confirmed =
        confirm("Delete this appointment?");

    if (!confirmed) return;

    try {

        await AppointmentsAPI.delete(id);

        Toast.success(
            "Appointment deleted."
        );

        loadAppointments();

    }

    catch (error) {

        console.error(error);

        Toast.error(
            "Delete failed."
        );

    }

}