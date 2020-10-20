import axios from '../axios-backend';

// const API_URL = 'http://localhost:8080/auth/';

const login = (email, password) => {
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
};

const logout = () => {
  localStorage.removeItem('token');
};

const register = (name, email, password) => {
  return axios
    .put('auth/signup', {
      email,
      name,
      password
    })
    .then(response => response.data);
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('token'));
};

export { login, logout, register, getCurrentUser };
