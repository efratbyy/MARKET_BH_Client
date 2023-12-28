import { ProductInterface } from "../models/interfaces/interfaces.ts";
import { ProductClientType } from "../types/productTypes";

const convertToDbType = (product: ProductClientType): ProductInterface => {
  return {
    title: product.title,
    brand: product.brand,
    barcode: product.barcode,
    categoryCode: product.categoryCode,
    price: product.price,
    image: {
      url: product.imageUrl,
      alt: product.imageAlt,
    },
    details: {
      ingredients: product.ingredients,
      weightTopDisplay: product.weightTopDisplay,
      weightUnitTopDisplay: product.weightUnitTopDisplay,
      weight: product.weight,
      weightUnit: product.weightUnit,
      divideBy: product.divideBy,
      isSodium: product.isSodium,
      isSugar: product.isSugar,
      isSaturatedFat: product.isSaturatedFat,
      isGreenMark: product.isGreenMark,
      isSupervised: product.isSupervised,
      content: product.content,
      manufacturingCountry: product.manufacturingCountry,
    },
    inventory: product.inventory,
  };
};

export default convertToDbType;
