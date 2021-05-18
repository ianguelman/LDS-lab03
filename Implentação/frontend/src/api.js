import axios from 'axios';
const headers = {'Content-Type': 'application/json'};

const api = axios.create({
  baseURL: 'http://localhost:8001',
  headers,
});

export default api;