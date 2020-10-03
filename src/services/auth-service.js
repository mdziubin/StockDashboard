import axios from '../axios-backend';

// const API_URL = 'http://localhost:8080/auth/';

class AuthService {
  login(email, password) {
    return axios
      .post('auth/signin', {
        email,
        password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('token', JSON.stringify(response.data.token));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('token');
  }

  register(name, email, password) {
    return axios
      .put('auth/signup', {
        email,
        name,
        password
      })
      .then(response => response.data);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('token'));
  }
}

export default new AuthService();
