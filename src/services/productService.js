import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081';

export const getProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}/products`);
  return response.data;
};

export const createProduct = async (product) => {
  const response = await axios.post(`${API_BASE_URL}/products`, product);
  return response.data;
};