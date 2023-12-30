import { useCallback } from "react";
import { getProductsApi } from "../apiService/productApiService";

const useProducts = () => {
  const handleGetProducts = useCallback(async () => {
    try {
      const products = await getProductsApi();
      return Promise.resolve(products);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return {
    handleGetProducts,
  };
};

export default useProducts;
