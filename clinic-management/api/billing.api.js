// ================================
// Billing API
// ================================

const BillingAPI = {

    async getAll(params = {}) {

        return API.get("/billing", params);

    },

    async getById(id) {

        return API.get(`/billing/${id}`);

    },

    async create(data) {

        return API.post("/billing", data);

    },

    async update(id, data) {

        return API.put(`/billing/${id}`, data);

    },

    async delete(id) {

        return API.delete(`/billing/${id}`);

    },

    async statistics() {

        return API.get("/billing/statistics");

    },

    async invoice(id) {

        return API.get(`/billing/${id}/invoice`);

    },

    async pay(id, data) {

        return API.post(`/billing/${id}/pay`, data);

    },

    async refund(id, data) {

        return API.post(`/billing/${id}/refund`, data);

    }

};