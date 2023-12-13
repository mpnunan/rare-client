import axios from 'axios';
import { clientCredentials } from './client';

const rare = axios.create({
  baseURL: clientCredentials.databaseURL,
  timeout: 3000,
  headers: { 'Content-Type': 'application/json' },
});

rare.interceptors.response.use((response) => response, (error) => {
  console.warn(error);
  throw error;
});

export default rare;
