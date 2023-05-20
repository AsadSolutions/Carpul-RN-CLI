import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const register = async (email, password) => {
  const response = await axios.post(`${API_URL}/register`, {email, password});
  return response.data.token;
};

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, {email, password});
  return response.data.token;
};
