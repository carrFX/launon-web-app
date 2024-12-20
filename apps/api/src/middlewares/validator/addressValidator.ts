import { createValidators, requiredField, requiredParamField, requiredStringField } from "@/helpers/handleValidator";

export const validateCreateAddress = createValidators({
  phone: requiredField("phone"),
  street: requiredStringField("street"),
  city: requiredStringField("city"),
  state: requiredStringField("state"),
  country: requiredStringField("country"),
  postalCode: requiredField("postalCode"),
});
export const validateIdOnParams = createValidators({
  id: requiredParamField("id"),
});
export const validateOutletIdOnParams = createValidators({
  outletId: requiredParamField("outletId"),
});
export const validateUserIdAndAddressId = createValidators({
  userId: requiredStringField("userId"),
  addressId: requiredStringField("addressId"),
});
export const validateUpdateAddress = createValidators({
  id: requiredStringField("id"),
  phone: requiredField("phone"),
  street: requiredStringField("street"),
  city: requiredStringField("city"),
  state: requiredStringField("state"),
  country: requiredStringField("country"),
  postalCode: requiredField("postalCode"),
});
