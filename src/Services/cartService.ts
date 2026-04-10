// src/services/cartService.ts
import api from "./apiService";

export const getCartAPI = async () => {
  return api.get(`/cart`);
};

export const addToCartAPI = async (item: any) => {
  return api.post(`/cart/add`, item);
};

export const updateCartAPI = async (id: string, qty: number) => {
  return api.put(`/cart/${id}`, { quantity: qty });
};

export const removeCartAPI = async (id: string) => {
  return api.delete(`/cart/remove/${id}`);
};

export const mergeCartAPI = async (cart: any[]) => {
  return api.post(`/cart/merge`, { cart });
};