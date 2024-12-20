import { createValidators, requiredField, requiredParamField, requiredStringField } from "@/helpers/handleValidator";

export const validateCreateOrder = createValidators({
  userId: requiredStringField("userId"),
  addressId: requiredStringField("addressId"),
  pickupSchedule: requiredField("pickupSchedule"),
})

export const validateOrderIdOnParams = createValidators({
  orderId: requiredParamField("orderId"),
})

export const validateOrderIdOnBody = createValidators({
  orderId: requiredStringField("orderId"),
})

export const validateUpdateOrder = createValidators({
  orderId: requiredParamField("orderId"),
  addressId: requiredStringField("addressId"),
  pickupSchedule: requiredField("pickupSchedule"),
  totalWeight: requiredField("totalWeight"),
  totalItems: requiredField("totalItems"),
  totalPrice: requiredField("totalPrice"),
  paymentStatus: requiredStringField("paymentStatus"),
  status: requiredStringField("status"),
})

export const validateUpdateOrderStatus = createValidators({
  orderId: requiredParamField("orderId"),
  status: requiredStringField("status"),
  userId: requiredStringField("userId"),
})

export const validateUpdatePriceAndWeight = createValidators({
  orderId: requiredParamField("orderId"),
  weight: requiredField("weight"),
  distance: requiredField("distance"),
  totalItems: requiredField("totalItems"),
})