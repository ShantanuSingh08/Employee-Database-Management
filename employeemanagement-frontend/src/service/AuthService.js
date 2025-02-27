import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Update this to match your backend URL

class AuthService {
    // Login user
    login(userData) {
        return axios.post(`${API_URL}/login`, userData);
    }

    // Register a new user (optional, depending on your use case)
    register(userData) {
        return axios.post(`${API_URL}/register`, userData);
    }

    // Logout user
    logout() {
        // Clear token and company name from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('companyName');
    }

    // Get the logged-in user's token
    getToken() {
        return localStorage.getItem('token');
    }

    // Get the logged-in user's company name
    getCompanyName() {
        return localStorage.getItem('companyName');
    }
}

export default new AuthService();
