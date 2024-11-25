// src/api/api.js
import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchItems = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching items:', error);
    }
};

export const addItem = async (item) => {
    try {
        const response = await axios.post(API_URL, item);
        return response.data;
    } catch (error) {
        console.error('Error adding item:', error);
    }
};

export const updateItem = async (id, updatedItem) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, updatedItem);
        return response.data;
    } catch (error) {
        console.error('Error updating item:', error);
    }
};

export const deleteItem = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error('Error deleting item:', error);
    }
};
