import axios from "axios";
import { getTokenFromLocalStorage } from "../helpers/localstorage.helper";

const token = getTokenFromLocalStorage();

export const instance = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        Authorization: token ? `Bearer ${token}` : '',
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

export const analyzeData = async (data: any) => {
    
    try {
        const response = await instance.post('/chatgpt/analyze', { data });        
        return response.data;
    } catch (error) {
        console.error('Error analyzing data:', error);
        throw error;
    }
};
