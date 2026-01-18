import api from './api';

export const queueService = {
    // Get live dashboard snapshot (Auth required)
    getLiveDashboard: async (counterId) => {
        // Ideally this would be /queue/dashboard?counter_id={id}
        // Mocking the structure provided by user for now or calling actual endpoint if exists.
        // Assuming GET /queue/dashboard
        const response = await api.get('/queue/dashboard', { params: { counter_id: counterId } });
        return response.data;
    },

    // Get public read-only dashboard by slug
    getPublicDashboard: async (slug) => {
        const response = await api.get(`/queue/public/${slug}`);
        return response.data;
    },

    // Actions
    serveNext: async (counterId) => {
        const response = await api.post('/queue/serve', { counter_id: counterId });
        return response.data;
    },

    markMissed: async (queueItemId) => {
        const response = await api.post(`/queue/items/${queueItemId}/miss`);
        return response.data;
    },

    cancelAppointment: async (queueItemId) => {
        const response = await api.post(`/queue/items/${queueItemId}/cancel`);
        return response.data;
    },

    addBooking: async (data) => {
        // data: { customer_name, customer_phone, queue_type: 'normal' | 'emergency', business_id }
        const response = await api.post('/queue/book', data);
        return response.data;
    }
};
