import axios from "axios";
import { BigCategoryInterface } from "../models/interfaces/interfaces.ts";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8188";

export const getCategoriesApi = async () => {
  try {
    const { data } = await axios.get<BigCategoryInterface[]>(
      `${apiUrl}/categories`
    );
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const getTranslatedCategoryCodeApi = async (categoryCode: string) => {
  try {
    const { data } = await axios.get<string>(
      `${apiUrl}/categories/${categoryCode}`
    );
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};
