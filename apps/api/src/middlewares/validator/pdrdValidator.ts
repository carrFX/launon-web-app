import { createValidators, requiredField, requiredParamField, requiredStringField } from "@/helpers/handleValidator";

export const validateCreatePdr = createValidators({
    orderId: requiredStringField("orderId"),
    distance: requiredField("distance"),
    driverId: requiredStringField("driverId"),
    fromAddressId: requiredStringField("fromAddressId"),
    toAddressId: requiredStringField("toAddressId"),
    status: requiredStringField("status"),
})

export const validateUpdatePdr = createValidators({
  id: requiredParamField("id"),
  orderId: requiredStringField("orderId"),
  distance: requiredField("distance"),
  driverId: requiredStringField("driverId"),
  fromAddressId: requiredStringField("fromAddressId"),
  toAddressId: requiredStringField("toAddressId"),
  requestType: requiredStringField("requestType"),
  status: requiredStringField("status"),
})

export const validateUpdatePdrStatus = createValidators({
  id: requiredStringField("id"),
  status: requiredStringField("status"),
})