import { useCallback } from "react";
import { getProductsApi } from "../apiService/productApiService";

const useProducts = () => {
  const handleGetProducts = useCallback(async () => {
    try {
      //setLoading(true);
      const products = await getProductsApi();
      //requestStatus(false, null, cards);
      return Promise.resolve(products);
    } catch (error) {
      //if (typeof error === "string") requestStatus(false, error, null);
    }
  }, []);

  return {
    handleGetProducts,
  };
};

export default useProducts;
