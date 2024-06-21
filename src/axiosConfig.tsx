// src/axiosConfig.ts
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080', // Ustaw odpowiedni bazowy URL API z portem 8080
    timeout: 1000,
    headers: { 'Content-Type': 'application/json' }
});

export default instance;
