// src/api/axios.api.ts
import axios from "axios";
import { getTokenFromLocalStorage } from "../helpers/localstorage.helper";

export const instance = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        Authorization: 'Bearer ' + getTokenFromLocalStorage() || '',
    },
});

export const getData = async () => {
    try {
        const response = await instance.get('/data');
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const createData = async (data: { date: string, sales: number, revenue: number, orders: number }) => {
    try {
        const response = await instance.post('/data', data);
        return response.data;
    } catch (error) {
        console.error('Error creating data:', error);
        throw error;
    }
};
