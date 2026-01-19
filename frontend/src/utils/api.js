import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Axios Instanz erstellen
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor für Token
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

// Response Interceptor für Fehlerbehandlung
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

// User API
export const userAPI = {
  updateProfile: (data) => api.put('/users/profile', data),
  uploadProfilePhoto: (formData) => api.post('/users/profile/photo', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getUserProfile: (id) => api.get(`/users/${id}`),
  getUsers: () => api.get('/users'),
};

// Dog API
export const dogAPI = {
  createDog: (data) => api.post('/dogs', data),
  getMyDogs: () => api.get('/dogs/my'),
  getDog: (id) => api.get(`/dogs/${id}`),
  updateDog: (id, data) => api.put(`/dogs/${id}`, data),
  deleteDog: (id) => api.delete(`/dogs/${id}`),
  uploadDogPhoto: (id, formData) => api.post(`/dogs/${id}/photo`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};

// Review API
export const reviewAPI = {
  createReview: (data) => api.post('/reviews', data),
  getUserReviews: (userId) => api.get(`/reviews/user/${userId}`),
  getMyReviews: () => api.get('/reviews/my'),
  updateReview: (id, data) => api.put(`/reviews/${id}`, data),
  deleteReview: (id) => api.delete(`/reviews/${id}`),
};

// Search API
export const searchAPI = {
  searchSitters: (params) => api.get('/search/sitters', { params }),
  searchOwners: (params) => api.get('/search/owners', { params }),
  searchDogs: (params) => api.get('/search/dogs', { params }),
};

export default api;
