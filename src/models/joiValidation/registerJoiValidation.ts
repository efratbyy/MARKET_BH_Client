import Joi from "joi";

const registerSchema = {
  first: Joi.string().min(2).max(256).required(),
  last: Joi.string().min(2).max(256).required(),
  phone: Joi.string()
    .pattern(/0[0-9]{1,2}-?\s?[0-9]{7}/)
    .message('user "phone" must be a valid phone number')
    .required(),
  email: Joi.string()
    .pattern(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
    .message('user "mail" must be a valid mail')
    .required(),
  password: Joi.string()
    .pattern(
      /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{8,20})/
    )
    .rule({
      message:
        'user "password" must be at least 8 characters long and contain an uppercase letter, a lowercase letter, at least 4 numbers and one of the following characters !@#$%^&*-',
    }) // /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/
    .required(),
  city: Joi.string().min(2).max(256).required(),
  street: Joi.string().min(2).max(256).required(),
  houseNumber: Joi.number().min(1).required(),
  isAdmin: Joi.boolean(),
};

export default registerSchema;
