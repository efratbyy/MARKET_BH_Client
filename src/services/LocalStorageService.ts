import React from "react";
import jwtDecode from "jwt-decode";
import { TokenType } from "../types/userTypes";

const TOKEN = "token_key";
const EXPIRATION_KEY = "tokenExpiration";
const ISRAEL_TIMEZONE = "Asia/Jerusalem";

export const getToken = () => {
  const token = localStorage.getItem(TOKEN);
  const expiration = localStorage.getItem(EXPIRATION_KEY);

  if (!token || !expiration) {
    return null; // No token or expiration found
  }

  // Parse the expiration timestamp in Israel Time
  const expirationTime = new Date(expiration);

  // Get the current time in Israel Time
  const currentTime = new Date().toLocaleString("en-US", {
    timeZone: ISRAEL_TIMEZONE,
  });

  if (new Date(currentTime) > expirationTime) {
    // Token has expired
    removeUser(); // you can clear the token from localStorage
    return null;
  }

  return token;
};

export const getUserFromLocalStorage = () => {
  const token = getToken();
  if (!token) return null;
  try {
    const user: TokenType = jwtDecode(token);
    return user;
  } catch (error) {
    return null;
  }
};

export const removeUser = () => {
  localStorage.removeItem(TOKEN);
  localStorage.removeItem(EXPIRATION_KEY);
};

export const saveUserToken = (token: string) => {
  const expirationTime = new Date();
  expirationTime.setHours(expirationTime.getHours() + 4); // Set expiration to 4 hours
  // Set the expiration timestamp in Israel Time
  const expirationString = expirationTime.toLocaleString("en-US", {
    timeZone: ISRAEL_TIMEZONE,
  });

  localStorage.setItem(TOKEN, token);
  localStorage.setItem(EXPIRATION_KEY, expirationString);
};
