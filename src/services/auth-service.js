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
        localStorage.setItem('authInfo', JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem('authInfo');
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
  return JSON.parse(localStorage.getItem('authInfo'));
};

export { login, logout, register, getCurrentUser };
