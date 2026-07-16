// ==========================================
// Patients API
// ==========================================

const PatientsAPI = {

    // ==========================
    // Get Patients List
    // ==========================
    async list(params = {}) {

        return await API.get("/patients", params);

    },

    // ==========================
    // Get Patient Details
    // ==========================
    async details(id) {

        return await API.get(`/patients/${id}`);

    },

    // ==========================
    // Create Patient
    // ==========================
    async create(data) {

        return await API.post("/patients", data);

    },

    // ==========================
    // Update Patient
    // ==========================
    async update(id, data) {

        return await API.put(`/patients/${id}`, data);

    },

    // ==========================
    // Delete Patient
    // ==========================
    async delete(id) {

        return await API.delete(`/patients/${id}`);

    },

    // ==========================
    // Search Patients
    // ==========================
    async search(keyword) {

        return await API.get("/patients/search", {
            q: keyword
        });

    }

};