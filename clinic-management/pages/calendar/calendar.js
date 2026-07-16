// ================================
// Calendar Controller
// ================================

document.addEventListener("DOMContentLoaded", async () => {

    try {

        Loader.show();

        const token = Token.get();

        if (!token) {

            window.location.href = "../login/login.html";
            return;

        }

        Sidebar.render("calendar");

        Navbar.init();

        Breadcrumb.set([
            { title: "Home", url: "../dashboard/dashboard.html" },
            { title: "Calendar" }
        ]);

        await loadProfile();

        await loadToday();

        await loadUpcoming();

        await loadEvents();

    } catch (error) {

        console.error(error);

        Toast.error("Failed to load calendar.");

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
// Today Events
// ================================

async function loadToday() {

    const today = await CalendarAPI.today();

    document.getElementById("todayEvents").textContent =
        today.total ?? 0;

}


// ================================
// Upcoming Events
// ================================

async function loadUpcoming() {

    const upcoming = await CalendarAPI.upcoming();

    document.getElementById("upcomingEvents").textContent =
        upcoming.total ?? 0;

}


// ================================
// Events Table
// ================================

async function loadEvents(page = 1) {

    try {

        Loader.show();

        const search =
            document.getElementById("searchEvent")?.value || "";

        const date =
            document.getElementById("eventDate")?.value || "";

        const response =
            await CalendarAPI.getEvents({

                page,
                search,
                date

            });

        Table.render({

            target: "#calendarTable",

            data: response.data,

            columns: [
                "title",
                "patient",
                "doctor",
                "date",
                "time",
                "status"
            ]

        });

        Pagination.render({

            target: "#calendarPagination",

            page: response.page,

            pages: response.pages,

            onChange: loadEvents

        });

    } catch (error) {

        console.error(error);

        Toast.error("Unable to load calendar.");

    } finally {

        Loader.hide();

    }

}


// ================================
// CRUD
// ================================

async function addEvent(data) {

    const response =
        await CalendarAPI.create(data);

    if (response.success) {

        Toast.success("Event created.");

        loadEvents();

    }

}

async function editEvent(id, data) {

    const response =
        await CalendarAPI.update(id, data);

    if (response.success) {

        Toast.success("Event updated.");

        loadEvents();

    }

}

async function deleteEvent(id) {

    if (!confirm("Delete this event?")) return;

    const response =
        await CalendarAPI.delete(id);

    if (response.success) {

        Toast.success("Event deleted.");

        loadEvents();

    }

}