// src/services/cartService.ts
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const getCartAPI = async (token: string) => {
  return axios.get(`${API}/cart`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const addToCartAPI = async (item: any, token: string) => {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
  return axios.post(`${API}/cart/add`, item, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateCartAPI = async (id: string, qty: number, token: string) => {
  return axios.put(
    `${API}/cart/${id}`,
    { quantity: qty },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const removeCartAPI = async (id: string, token: string) => {
  return axios.delete(`${API}/cart/remove/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const mergeCartAPI = async (cart: any[], token: string) => {
  return axios.post(
    `${API}/cart/merge`,
    { cart },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};