import Joi from "joi";

const loginSchema = {
  email: Joi.string()
    .ruleset.pattern(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
    .rule({ message: 'user "mail" mast be a valid mail' })
    .required(),

  password: Joi.string()
    .ruleset.regex(
      /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{8,20})/
    )
    .rule({
      message:
        'user "password" must be at least 8 characters long and contain an uppercase letter, a lowercase letter, at least 4 numbers and one of the following characters !@#$%^&*-',
    }) // /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/
    .required(),
};

export default loginSchema;
