import axios from 'axios';

const API_URL = 'http://localhost:8080/auth/';

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + 'signin', {
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
    return axios.post(API_URL + 'signup', {
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
