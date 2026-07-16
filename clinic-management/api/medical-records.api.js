// ================================
// Medical Records API
// ================================

const MedicalRecordsAPI = {

    async getAll(params = {}) {

        return API.get("/medical-records", params);

    },

    async getById(id) {

        return API.get(`/medical-records/${id}`);

    },

    async getByPatient(patientId) {

        return API.get(`/patients/${patientId}/medical-records`);

    },

    async create(data) {

        return API.post("/medical-records", data);

    },

    async update(id, data) {

        return API.put(`/medical-records/${id}`, data);

    },

    async delete(id) {

        return API.delete(`/medical-records/${id}`);

    },

    async uploadAttachment(id, file) {

        const formData = new FormData();

        formData.append("file", file);

        return API.upload(`/medical-records/${id}/attachments`, formData);

    },

    async deleteAttachment(recordId, attachmentId) {

        return API.delete(
            `/medical-records/${recordId}/attachments/${attachmentId}`
        );

    }

};