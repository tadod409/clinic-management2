// ================================
// Calendar API
// ================================

const CalendarAPI = {

    async getEvents(params = {}) {

        return API.get("/calendar/events", params);

    },

    async getById(id) {

        return API.get(`/calendar/events/${id}`);

    },

    async create(data) {

        return API.post("/calendar/events", data);

    },

    async update(id, data) {

        return API.put(`/calendar/events/${id}`, data);

    },

    async delete(id) {

        return API.delete(`/calendar/events/${id}`);

    },

    async today() {

        return API.get("/calendar/today");

    },

    async upcoming() {

        return API.get("/calendar/upcoming");

    }

};