// ================================
// Appointments API
// ================================

const AppointmentsAPI = {

    async list(filters = {}) {

        return await API.get("/appointments", filters);

    },

    async get(id) {

        return await API.get(`/appointments/${id}`);

    },

    async create(data) {

        return await API.post("/appointments", data);

    },

    async update(id, data) {

        return await API.put(`/appointments/${id}`, data);

    },

    async delete(id) {

        return await API.delete(`/appointments/${id}`);

    },

    async doctors() {

        return await API.get("/doctors");

    },

    async availableTimes(doctorId, date) {

        return await API.get("/appointments/available-times", {

            doctorId,

            date

        });

    },

    async today() {

        return await API.get("/appointments/today");

    },

    async upcoming() {

        return await API.get("/appointments/upcoming");

    },

    async completed() {

        return await API.get("/appointments/completed");

    },

    async cancelled() {

        return await API.get("/appointments/cancelled");

    }

};