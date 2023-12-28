import axios from "axios";
import {
  CartProductInterface,
  ProductInterface,
} from "../models/interfaces/interfaces.ts";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8188";

export const addToCartApi = async (
  userId: string,
  barcode: string,
  amount: number
) => {
  try {
    const token = localStorage.getItem("token_key");
    const { data } = await axios.patch<CartProductInterface[]>(
      `${apiUrl}/cart/addToCart/${userId}/${barcode}/${amount}`,
      null,
      { headers: { "x-auth-token": token } }
    );
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.response?.data);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const removeFromCartApi = async (
  userId: string,
  barcode: string,
  amount: number
) => {
  try {
    const token = localStorage.getItem("token_key");
    const { data } = await axios.patch<CartProductInterface[]>(
      `${apiUrl}/cart/removeFromCart/${userId}/${barcode}/${amount}`,
      null,
      { headers: { "x-auth-token": token } }
    );
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.response?.data);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const addCartNoteApi = async (
  userId: string,
  barcode: string,
  note: string
) => {
  try {
    const token = localStorage.getItem("token_key");
    const { data } = await axios.patch<CartProductInterface[]>(
      `${apiUrl}/cart/addNote/${userId}/${barcode}`,
      { note: note }, // Send note parameter in request Body
      { headers: { "x-auth-token": token } }
    );
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.response?.data);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const getCartApi = async (userId: String) => {
  try {
    const token = localStorage.getItem("token_key");
    const { data } = await axios.get<CartProductInterface[]>(
      `${apiUrl}/cart/${userId}`,
      {
        headers: { "x-auth-token": token },
      }
    );
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const getOutOfStockProductsApi = async (userId: String) => {
  try {
    const token = localStorage.getItem("token_key");
    const { data } = await axios.get<ProductInterface[]>(
      `${apiUrl}/cart/out_of_stock/${userId}`,
      {
        headers: { "x-auth-token": token },
      }
    );
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};
