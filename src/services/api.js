import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = 'http://localhost:3000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    const message = error.response?.data?.error || error.response?.data?.message || 'An error occurred';
    toast.error(message);
    
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/register', userData),
  login: (credentials) => api.post('/login', credentials),
};

// Movies API
export const moviesAPI = {
  getAll: () => api.get('/movies'),
  getById: (id) => api.get(`/movies/${id}`),
  create: (movieData) => api.post('/admin/movies', movieData),
  update: (id, movieData) => api.patch(`/admin/movies/${id}`, movieData),
  delete: (id) => api.delete(`/admin/movies/${id}`),
};

// Users API
export const usersAPI = {
  getProfile: () => api.get('/users/profile'),
  getAll: () => api.get('/admin/users'),
  getById: (id) => api.get(`/admin/user/${id}`),
  update: (id, userData) => api.patch(`/admin/user/${id}`, userData),
  delete: (id) => api.delete(`/admin/user/${id}`),
};

// Showtimes API
export const showtimesAPI = {
  getByMovie: (movieId) => api.get(`/${movieId}/showtime`),
  getById: (movieId, showtimeId) => api.get(`/${movieId}/showtime/${showtimeId}`),
  create: (showtimeData) => api.post('/showtime', showtimeData),
  update: (movieId, showtimeId, data) => api.patch(`/${movieId}/showtime/${showtimeId}`, data),
  delete: (movieId, showtimeId) => api.delete(`/${movieId}/showtime/${showtimeId}`),
};

// Bookings API
export const bookingsAPI = {
  create: (bookingData) => api.post('/booking', bookingData),
  getByShowtime: (showtimeId) => api.get(`/${showtimeId}/booking`),
};

export default api;