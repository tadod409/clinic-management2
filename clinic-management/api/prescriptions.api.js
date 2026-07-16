// ================================
// Prescriptions API
// ================================

const PrescriptionsAPI = {

    // ================================
    // Get Statistics
    // ================================

    async statistics() {

        return await API.get(
            "/prescriptions/statistics"
        );

    },

    // ================================
    // Get All Prescriptions
    // ================================

    async list(filters = {}) {

        const query = new URLSearchParams(filters).toString();

        return await API.get(
            `/prescriptions?${query}`
        );

    },

    // ================================
    // Get Single Prescription
    // ================================

    async get(id) {

        return await API.get(
            `/prescriptions/${id}`
        );

    },

    // ================================
    // Create Prescription
    // ================================

    async create(data) {

        return await API.post(
            "/prescriptions",
            data
        );

    },

    // ================================
    // Update Prescription
    // ================================

    async update(id, data) {

        return await API.put(
            `/prescriptions/${id}`,
            data
        );

    },

    // ================================
    // Delete Prescription
    // ================================

    async delete(id) {

        return await API.delete(
            `/prescriptions/${id}`
        );

    },

    // ================================
    // Print Prescription
    // ================================

    async print(id) {

        return await API.get(
            `/prescriptions/${id}/print`
        );

    },

    // ================================
    // Export PDF
    // ================================

    async exportPDF(id) {

        return await API.get(
            `/prescriptions/${id}/pdf`
        );

    },

    // ================================
    // Search Patients
    // ================================

    async searchPatients(keyword) {

        return await API.get(
            `/patients/search?q=${encodeURIComponent(keyword)}`
        );

    },

    // ================================
    // Search Medicines
    // ================================

    async searchMedicines(keyword) {

        return await API.get(
            `/medicines/search?q=${encodeURIComponent(keyword)}`
        );

    }

};