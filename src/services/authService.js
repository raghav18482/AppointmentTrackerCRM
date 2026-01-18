import api from './api';

export const authService = {
    // Login user
    login: async (credentials) => {
        // credentials: { email, password }
        const response = await api.post('/auth/login', credentials);
        return response.data;
    },

    // Get user role
    getRole: async (businessId) => {
        const response = await api.get('/auth/role', {
            headers: { 'X-Business-ID': businessId }
        });
        return response.data;
    },

    // Logout user
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('token_type');
        localStorage.removeItem('user_id');
        localStorage.removeItem('business_id');
        localStorage.removeItem('role');
        localStorage.removeItem('business_name');
        window.location.href = '/login';
    },

    // Get current user info from storage
    getCurrentUser: () => {
        return {
            userId: localStorage.getItem('user_id'),
            businessId: localStorage.getItem('business_id'),
            role: localStorage.getItem('role'),
            businessName: localStorage.getItem('business_name')
        };
    },

    // Check if user is authenticated
    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    }
};
