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

    // Get counters for a business (assuming endpoint exists or using generic list)
    // For now, based on user input, we only saw CREATE.
    // We'll add list later when API is confirmed.
};
