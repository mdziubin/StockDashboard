import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://cloud.iexapis.com/stable/',
  params: {
    token: process.env.REACT_APP_IEX_API_KEY
  }
});

export default instance;
