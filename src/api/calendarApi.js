import axios from 'axios';
import { getEnvVariables } from '../helpers';

const {VITE_API_URL}=getEnvVariables();

console.log("Ruta de api--->> " +VITE_API_URL);

const calendarApi = axios.create({
    baseURL:VITE_API_URL
});

//Interceptores

//config
calendarApi.interceptors.request.use(config=>{

    config.headers = {
        ...config.headers,
        'x-token':localStorage.getItem('token')
    }

    return config;
})

export default calendarApi;