import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Important: Include cookies in requests
});

// Track if we're currently refreshing to avoid multiple refresh calls
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

// Interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor to handle responses and token refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If error is 401 and we haven't tried to refresh yet
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // If already refreshing, queue this request
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then(token => {
                        originalRequest.headers['Authorization'] = `Bearer ${token}`;
                        return api(originalRequest);
                    })
                    .catch(err => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // Attempt to refresh token
                const response = await axios.post(
                    'http://localhost:8000/api/v1/auth/refresh',
                    {},
                    {
                        withCredentials: true, // Include cookies
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }
                );

                const { access_token, user_id, business_id } = response.data;

                // Update stored tokens
                localStorage.setItem('access_token', access_token);
                if (user_id) {
                    localStorage.setItem('user_id', user_id);
                }
                if (business_id) {
                    localStorage.setItem('business_id', business_id);
                }

                // Update authorization header for original request
                originalRequest.headers['Authorization'] = `Bearer ${access_token}`;

                // Process queued requests
                processQueue(null, access_token);
                isRefreshing = false;

                // Retry original request
                return api(originalRequest);
            } catch (refreshError) {
                // Refresh failed, clear storage and redirect to login
                processQueue(refreshError, null);
                isRefreshing = false;
                
                localStorage.removeItem('access_token');
                localStorage.removeItem('user_id');
                localStorage.removeItem('business_id');
                localStorage.removeItem('token_type');
                localStorage.removeItem('role');
                localStorage.removeItem('business_name');
                
                // Redirect to login
                if (window.location.pathname !== '/login') {
                    window.location.href = '/login';
                }
                
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
