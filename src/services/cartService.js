import axios from 'axios';

const API_BASE_URL = 'http://localhost:8082';

export const addToCartApi = async (cartItem) => {
  const response = await axios.post(`${API_BASE_URL}/cart-items`, cartItem);
  return response.data;
};

export const getCartItemsApi = async () => {
  const response = await axios.get(`${API_BASE_URL}/cart-items`);
  return response.data;
};