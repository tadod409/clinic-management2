// ================================
// Doctors API
// ================================

const DoctorsAPI = {

    async getAll(params = {}) {

        return API.get("/doctors", params);

    },

    async getById(id) {

        return API.get(`/doctors/${id}`);

    },

    async create(data) {

        return API.post("/doctors", data);

    },

    async update(id, data) {

        return API.put(`/doctors/${id}`, data);

    },

    async delete(id) {

        return API.delete(`/doctors/${id}`);

    },

    async statistics() {

        return API.get("/doctors/statistics");

    },

    async schedule(id) {

        return API.get(`/doctors/${id}/schedule`);

    }

};