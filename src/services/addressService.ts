import axios from "axios";
import { Address } from "../types/types";
const API_URL = "/api/data";

export const getAddress = async () => {
  try {
    const response = await axios.get('/api/data');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const postAddress = async (address: Address) => {
  try {
    const response = await axios.post(`${API_URL}`, address);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const putAddress = async (address: Address) => {
  try {
    const response = await axios.put(`${API_URL}`, address);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteAddress = async (id: string) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};