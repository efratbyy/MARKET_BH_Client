import axios from "axios";
import { ProductInterface } from "../models/interfaces/interfaces.ts";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8188";

export const getProductsApi = async () => {
  try {
    const { data } = await axios.get<ProductInterface[]>(`${apiUrl}/products`);
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const getProductByBarcodeApi = async (barcode: string) => {
  try {
    const { data } = await axios.get<ProductInterface>(
      `${apiUrl}/products/${barcode}`
    );
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!!");
  }
};

export const addProductApi = async (product: ProductInterface) => {
  try {
    const token = localStorage.getItem("token_key");
    const { data } = await axios.post<ProductInterface>(
      `${apiUrl}/products/add-product`,
      product,
      { headers: { "x-auth-token": token } }
    );
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const editProductApi = async (productToUpdate: ProductInterface) => {
  try {
    const token = localStorage.getItem("token_key");
    const { data } = await axios.patch<ProductInterface>(
      `${apiUrl}/products/edit-product`,
      productToUpdate,
      { headers: { "x-auth-token": token } }
    );
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const deleteProductApi = async (barcode: string) => {
  try {
    const token = localStorage.getItem("token_key");
    const { data } = await axios.delete<ProductInterface>(
      `${apiUrl}/products/delete-product`,
      {
        headers: { "x-auth-token": token },
        params: { barcode },
      }
    );
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const updateProductInventoryApi = async (
  barcode: string,
  newInventory: number
) => {
  try {
    const token = localStorage.getItem("token_key");
    const { data } = await axios.patch<ProductInterface>(
      `${apiUrl}/products/update_inventory/${barcode}/${newInventory}`,
      null,
      { headers: { "x-auth-token": token } }
    );
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const updateProductPriceApi = async (
  barcode: string,
  newPrice: number
) => {
  try {
    const token = localStorage.getItem("token_key");
    const { data } = await axios.patch<ProductInterface>(
      `${apiUrl}/products/update_price/${barcode}/${newPrice}`,
      null,
      { headers: { "x-auth-token": token } }
    );
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};
