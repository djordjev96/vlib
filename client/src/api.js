import axios from 'axios';
axios.defaults.baseURL = 'https://vlib.oreactor.com';
axios.defaults.headers.common = {'Authorization': `Bearer ${localStorage.getItem('token')}`};
axios.defaults.responseType = 'json';
export default axios;