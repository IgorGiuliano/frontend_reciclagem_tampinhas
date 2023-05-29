import axios from 'axios';

const api = axios.create({
    baseURL: 'https://backend-tampinhas.onrender.com/'
});

export default api;
