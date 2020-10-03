import axios from '../axios-backend';

// const API_URL = 'http://localhost:8080/auth/';

class AuthService {
  login(email, password) {
    return axios
      .post('auth/signin', {
        email: email,
        password: password
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

  register(username, email, password) {
    return axios.post('auth/signup', {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('token'));
  }
}

export default new AuthService();
