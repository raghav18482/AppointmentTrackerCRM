import api from './api';

export const staffService = {
    // Get all staff members for a business
    getAllStaff: async (businessId) => {
        const response = await api.get('/staff/', {
            headers: { 'X-Business-ID': businessId }
        });
        return response.data;
    },

    // Add a new staff member
    addStaff: async (businessId, staffData) => {
        // staffData: { user_id, role } regarding existing user
        const response = await api.post('/staff/', staffData, {
            headers: { 'X-Business-ID': businessId }
        });
        return response.data;
    },

    // Create a new staff member (User + Staff entry)
    createStaff: async (businessId, staffData) => {
        // staffData: { email, password, role }
        const response = await api.post('/staff/create', staffData, {
            headers: { 'X-Business-ID': businessId }
        });
        return response.data;
    }
};
