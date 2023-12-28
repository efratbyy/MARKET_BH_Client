import { ProductInterface } from "../models/interfaces/interfaces.ts";
import { ProductClientType } from "../types/productTypes.js";

const convertToClientType = (product: ProductInterface): ProductClientType => {
  return {
    title: product.title,
    brand: product.brand,
    barcode: product.barcode,
    categoryCode: product.categoryCode,
    price: product.price,
    imageUrl: product.image.url,
    imageAlt: product.image.alt,
    ingredients: product.details.ingredients,
    weightTopDisplay: product.details.weightTopDisplay,
    weightUnitTopDisplay: product.details.weightUnitTopDisplay,
    weight: product.details.weight,
    weightUnit: product.details.weightUnit,
    divideBy: product.details.divideBy,
    isSodium: product.details.isSodium,
    isSugar: product.details.isSugar,
    isSaturatedFat: product.details.isSaturatedFat,
    isGreenMark: product.details.isGreenMark,
    isSupervised: product.details.isSupervised,
    content: product.details.content,
    manufacturingCountry: product.details.manufacturingCountry,
    inventory: product.inventory,
  };
};

export default convertToClientType;
