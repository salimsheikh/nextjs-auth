// src/helpers/axiosInstance.ts
import axios from 'axios';

export const axiosInstance = () => {

    const base_url = `${process.env.DOMAIN}/api/users/profile`;

    return axios.create({
        baseURL: base_url, // Set your base URL here
    });

};