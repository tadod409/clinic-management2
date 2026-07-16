// ================================
// Reports API
// ================================

const ReportsAPI = {

    async dashboard(params = {}) {

        return API.get("/reports/dashboard", params);

    },

    async appointments(params = {}) {

        return API.get("/reports/appointments", params);

    },

    async patients(params = {}) {

        return API.get("/reports/patients", params);

    },

    async doctors(params = {}) {

        return API.get("/reports/doctors", params);

    },

    async revenue(params = {}) {

        return API.get("/reports/revenue", params);

    },

    async exportPDF(params = {}) {

        return API.get("/reports/export/pdf", params);

    },

    async exportExcel(params = {}) {

        return API.get("/reports/export/excel", params);

    },

    async exportCSV(params = {}) {

        return API.get("/reports/export/csv", params);

    }

};