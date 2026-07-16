// ==========================================
// Dashboard API
// ==========================================

const DashboardAPI = {

    // ==========================
    // Dashboard Statistics
    // ==========================
    async statistics() {

        return await API.get("/dashboard/statistics");

    },

    // ==========================
    // Upcoming Appointments
    // ==========================
    async appointments() {

        return await API.get("/dashboard/appointments");

    },

    // ==========================
    // Patient Volume Chart
    // ==========================
    async chart() {

        return await API.get("/dashboard/chart");

    },

    // ==========================
    // Recent Activities
    // ==========================
    async activities() {

        return await API.get("/dashboard/activities");

    },

    // ==========================
    // Notifications
    // ==========================
    async notifications() {

        return await API.get("/dashboard/notifications");

    }

};