import api from './api';

export const businessService = {
    // Create a new business
    createBusiness: async (data) => {
        // data: { name, type, timezone }
        const response = await api.post('/business/', data);
        return response.data;
    },

    // Create a new counter
    createCounter: async (businessId, data) => {
        // data: { name, is_active }
        // headers: X-Business-ID
        const response = await api.post('/counters/', data, {
            headers: { 'X-Business-ID': businessId }
        });
        return response.data;
    },

    // List counters
    getCounters: async (businessId) => {
        const response = await api.get('/counters/?include_inactive=false', {
            headers: { 'X-Business-ID': businessId }
        });
        return response.data;
    },

    // Update a counter
    updateCounter: async (businessId, counterId, data) => {
        // data: { name, is_active }
        const response = await api.put(`/counters/${counterId}`, data, {
            headers: { 'X-Business-ID': businessId }
        });
        return response.data;
    },

    // Delete a counter
    deleteCounter: async (businessId, counterId) => {
        const response = await api.delete(`/counters/${counterId}`, {
            headers: { 'X-Business-ID': businessId }
        });
        return response.data;
    },
};
