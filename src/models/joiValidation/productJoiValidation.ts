import Joi from "joi";

const productSchema = {
  title: Joi.string().min(2).max(256).required(),
  brand: Joi.string().min(2).max(256).required(),
  barcode: Joi.string()
    .pattern(/^[0-9]+$/, "must only contain numeric characters")
    .min(2)
    .max(256)
    .required(),
  categoryCode: Joi.array()
    .items(Joi.string().regex(/^[0-9_]+$/))
    .min(1)
    .max(256)
    .required(),
  price: Joi.number().min(2).required(),
  imageUrl: Joi.string().min(2).max(256),
  imageAlt: Joi.string().min(2).max(256),
  ingredients: Joi.string().min(2).max(256),
  weightTopDisplay: Joi.number().min(1).required(),
  weightUnitTopDisplay: Joi.string().min(2).max(256).required(),
  weight: Joi.number(),
  weightUnit: Joi.string().min(2).max(256).required(),
  divideBy: Joi.number().min(1).max(256).required(),
  isSodium: Joi.boolean(),
  isSugar: Joi.boolean(),
  isSaturatedFat: Joi.boolean(),
  isGreenMark: Joi.boolean(),
  isSupervised: Joi.boolean(),
  content: Joi.string().min(2).max(256),
  manufacturingCountry: Joi.string().min(2).max(256),
  inventory: Joi.number().required(),
};

export default productSchema;
