import Joi from "joi";

const creditCardSchema = {
  cardHolderName: Joi.string().min(3).required(),
  creditCardNumber: Joi.string()
    .pattern(
      new RegExp("^\\d{4}\\s\\d{4}\\s\\d{4}\\s\\d{4}$|\\d{4}\\s\\d{6}\\s\\d{5}")
    )
    .required(),
  EXPdate: Joi.string().pattern(new RegExp("^\\d{2}\\s/\\s\\d{2}$")).required(),
  CVV: Joi.string().pattern(new RegExp("^\\d{3}$")).required(),
  ID: Joi.string().alphanum().min(8).max(12).required(),
};

export default creditCardSchema;
