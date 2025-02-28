import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Add a request interceptor to include the JWT token in headers
API.interceptors.request.use((req) => {
  try {
    const userInfoStr = localStorage.getItem('userInfo');
    if (!userInfoStr) return req;

    const userInfo = JSON.parse(userInfoStr);
    if (userInfo && userInfo.token) {
      req.headers.Authorization = `Bearer ${userInfo.token}`;
    }
  } catch (error) {
    console.error('Error processing auth token:', error);
    localStorage.removeItem('userInfo'); // Clear invalid data
  }
  return req;
});

// Add a response interceptor to handle token expiry
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token is invalid or expired
      console.error('Authentication error:', error.response.data);
      localStorage.removeItem('userInfo');
      window.location.href = '/auth'; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

// Posts
export const fetchPosts = () => API.get('/posts');
export const fetchPostById = (id) => API.get(`/posts/${id}`);
export const createPost = (post) => API.post('/posts', post);
export const updatePost = (id, post) => API.put(`/posts/${id}`, post);
export const deletePost = (id) => API.delete(`/posts/${id}`);

// Auth
export const registerUser = (userData) => API.post('/auth/register', userData);
export const loginUser = (userData) => API.post('/auth/login', userData);