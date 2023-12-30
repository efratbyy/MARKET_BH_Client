import axios from "axios";
import {
  PurchaseHistoryInterface,
  UserInterface,
} from "../models/interfaces/interfaces.ts.js";
import { LoginType } from "../types/userTypes.js";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8188";

export const registrationApi = async (user: UserInterface) => {
  try {
    const { data } = await axios.post(`${apiUrl}/users/register`, user);
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.response?.data);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const loginApi = async (user: LoginType) => {
  try {
    const { data } = await axios.post<string>(`${apiUrl}/users/login`, user);
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 403)
        return Promise.reject("שם משתמש ו/או סיסמא לא נכונים!");
      return Promise.reject(error.response?.data);
    }
    return Promise.reject("An unexpected error occurred!");
  }
};

export const checkoutApi = async (userId: string) => {
  try {
    const token = localStorage.getItem("token_key");
    const { data } = await axios.patch<Number>(
      `${apiUrl}/users/checkout/${userId}`,
      null,
      { headers: { "x-auth-token": token } }
    );
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.response?.data);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const getPurchaseHistoryApi = async (userId: String) => {
  try {
    const token = localStorage.getItem("token_key");
    const { data } = await axios.get<PurchaseHistoryInterface[]>(
      `${apiUrl}/users/purchase-history/${userId}`,
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

export const getPurchaseHistoryDetailsApi = async (
  userId: string,
  orderNumber: string
) => {
  try {
    const token = localStorage.getItem("token_key");
    const { data } = await axios.get<PurchaseHistoryInterface>(
      `${apiUrl}/users/purchase-history-details/${userId}/${orderNumber}`,
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

export const editUserApi = async (
  userToEdit: UserInterface,
  newPassword: string
) => {
  try {
    const userToServer = { ...userToEdit, newPassword: newPassword }; // Include newPassword in the object
    const token = localStorage.getItem("token_key");
    const { data } = await axios.put<UserInterface>(
      `${apiUrl}/users/edit-user`,
      userToServer, // contains the updated information about the user
      { headers: { "x-auth-token": token } }
    );
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const getUsersApi = async () => {
  try {
    const token = localStorage.getItem("token_key");

    const { data } = await axios.get<UserInterface[]>(`${apiUrl}/users`, {
      headers: { "x-auth-token": token },
    });

    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const getUserByIdApi = async (userId: string) => {
  try {
    const token = localStorage.getItem("token_key");
    const { data } = await axios.get<UserInterface>(
      `${apiUrl}/users/${userId}`,
      { headers: { "x-auth-token": token } }
    );
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const createResetPasswordKeyApi = async (userEmail: string) => {
  try {
    const { data } = await axios.patch<UserInterface>(
      `${apiUrl}/users/forgot_password/${userEmail}`
    );
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const getUserByForgotPasswordKeyApi = async (
  forgotPasswordKey: string
) => {
  try {
    const { data } = await axios.get<UserInterface>(
      `${apiUrl}/users/get_user_by_forgot_password_key/${forgotPasswordKey}`
    );
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const updatePasswordApi = async (
  forgotPasswordKey: string,
  newPassword: string
) => {
  try {
    const dataToServer = {
      forgotPasswordKey: forgotPasswordKey,
      newPassword: newPassword,
    };
    const { data } = await axios.patch<UserInterface>(
      `${apiUrl}/users/update_password`,
      dataToServer
    );
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const deleteUserApi = async (userEmail: string) => {
  try {
    const token = localStorage.getItem("token_key");
    const { data } = await axios.delete<UserInterface>(
      `${apiUrl}/users/delete_user`,
      {
        headers: { "x-auth-token": token },
        params: { userEmail },
      }
    );
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};

export const getUserByEmailApi = async (userEmail: string) => {
  try {
    const token = localStorage.getItem("token_key");
    const { data } = await axios.get<UserInterface>(
      `${apiUrl}/users/get_user/${userEmail}`,
      { headers: { "x-auth-token": token } }
    );
    return Promise.resolve(data);
  } catch (error) {
    if (axios.isAxiosError(error)) return Promise.reject(error.message);
    return Promise.reject("An unexpected error occurred!");
  }
};
