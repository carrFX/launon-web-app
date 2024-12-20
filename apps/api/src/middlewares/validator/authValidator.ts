import { createValidators, requiredField, requiredMailField, requiredStringField } from "@/helpers/handleValidator";

export const validateRegister = createValidators({
  username: requiredStringField("username"),
  mail: requiredMailField("mail"),
})

export const validateLogin = createValidators({
  mail: requiredMailField("mail"),
  password: requiredStringField("password"),
})

export const validateSetPass = createValidators({
  verifyToken: requiredField('verifyToken'),
  password: requiredStringField("password"),
})