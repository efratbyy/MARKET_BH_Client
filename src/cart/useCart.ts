import { useCallback } from "react";
import {
  addCartNoteApi,
  addToCartApi,
  getCartApi,
  removeFromCartApi,
} from "../apiService/cartApiService";
import { useSnack } from "../providers/SnackbarProvider";
import { checkoutApi } from "../apiService/userApiService";

const useCart = () => {
  const snack = useSnack();

  const handleGetCart = useCallback(async (userId: string) => {
    try {
      //setLoading(true);
      if (userId) {
        const cart = await getCartApi(userId);
        //requestStatus(false, null, cart);
        return Promise.resolve(cart);
      }
      return undefined;
    } catch (error) {
      //if (typeof error === "string") requestStatus(false, error, null);
    }
  }, []);

  const updateCart = useCallback(
    async (userId: string, barcode: string, amount: number) => {
      if (userId) {
        let newCart;
        if (amount > 0) {
          newCart = await addToCartApi(userId, barcode, amount);
          snack("success", "המוצר התווסף לעגלה בהצלחה!");
        } else {
          newCart = await removeFromCartApi(userId, barcode, amount * -1);
          snack("success", "המוצר הוסר מהעגלה בהצלחה!");
        }
        return Promise.resolve(newCart);
      }
    },
    []
  );

  const updateCartNote = async (
    userId: string,
    barcode: string,
    note: string
  ) => {
    if (userId) {
      const newCart = await addCartNoteApi(userId, barcode, note);
      return newCart;
    }
  };

  const handleCheckout = async (userId: string) => {
    if (userId) {
      const orderNumber = await checkoutApi(userId);
      return orderNumber;
    }
  };

  return {
    handleGetCart,
    updateCart,
    updateCartNote,
    handleCheckout,
  };
};

export default useCart;
