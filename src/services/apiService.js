// src/services/apiService.js

import axios from 'axios';

const apiUrl = 'https://jsonplaceholder.typicode.com/posts'; // You can replace this with your desired API URL

export const fetchItems = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching items", error);
  }
};

export const addItem = async (item) => {
  try {
    const response = await axios.post(apiUrl, item);
    return response.data;
  } catch (error) {
    console.error("Error adding item", error);
  }
};

export const updateItem = async (id, updatedItem) => {
  try {
    const response = await axios.put(`${apiUrl}/${id}`, updatedItem);
    return response.data;
  } catch (error) {
    console.error("Error updating item", error);
  }
};

export const deleteItem = async (id) => {
  try {
    await axios.delete(`${apiUrl}/${id}`);
    return id;
  } catch (error) {
    console.error("Error deleting item", error);
  }
};
