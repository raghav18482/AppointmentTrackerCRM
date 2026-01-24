import api from './api';
import axios from 'axios';

// Token expiration check utility
const isTokenExpiringSoon = (token) => {
    if (!token) return true;
    
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const exp = payload.exp * 1000; // Convert to milliseconds
        const now = Date.now();
        const fiveMinutes = 5 * 60 * 1000;
        
        // Return true if token expires in less than 5 minutes
        return (exp - now) < fiveMinutes;
    } catch (error) {
        return true; // If we can't parse, assume expired
    }
};

// Proactive token refresh
let refreshTimer = null;

const startTokenRefreshTimer = () => {
    // Clear existing timer
    if (refreshTimer) {
        clearInterval(refreshTimer);
    }
    
    // Check token expiration every minute
    refreshTimer = setInterval(async () => {
        const token = localStorage.getItem('access_token');
        
        if (token && isTokenExpiringSoon(token)) {
            try {
                // Proactively refresh token
                const response = await axios.post(
                    'http://localhost:8000/api/v1/auth/refresh',
                    {},
                    {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }
                );
                
                const { access_token, user_id, business_id } = response.data;
                
                localStorage.setItem('access_token', access_token);
                if (user_id) {
                    localStorage.setItem('user_id', user_id);
                }
                if (business_id) {
                    localStorage.setItem('business_id', business_id);
                }
                
                console.log('Token refreshed proactively');
            } catch (error) {
                console.error('Proactive token refresh failed:', error);
                // Don't redirect here, let the 401 interceptor handle it
            }
        }
    }, 60 * 1000); // Check every minute
};

const stopTokenRefreshTimer = () => {
    if (refreshTimer) {
        clearInterval(refreshTimer);
        refreshTimer = null;
    }
};

export const authService = {
    // Login user
    login: async (credentials) => {
        // credentials: { email, password }
        const response = await api.post('/auth/login', credentials);
        const { access_token, user_id, business_id } = response.data;
        
        // Store access token (refresh token is in HTTP-only cookie)
        localStorage.setItem('access_token', access_token);
        if (user_id) {
            localStorage.setItem('user_id', user_id);
        }
        if (business_id) {
            localStorage.setItem('business_id', business_id);
        }
        
        // Start proactive refresh timer
        startTokenRefreshTimer();
        
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
    logout: async () => {
        // Stop proactive refresh timer
        stopTokenRefreshTimer();
        
        try {
            // Call logout endpoint to revoke refresh token
            await api.post('/auth/logout');
        } catch (error) {
            console.error('Logout API call failed:', error);
        }
        
        // Clear all stored data
        localStorage.removeItem('access_token');
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
        return !!localStorage.getItem('access_token');
    },
    
    // Start proactive refresh timer (call this on app initialization if user is logged in)
    startRefreshTimer: () => {
        if (authService.isAuthenticated()) {
            startTokenRefreshTimer();
        }
    },
    
    // Stop proactive refresh timer
    stopRefreshTimer: () => {
        stopTokenRefreshTimer();
    }
};
