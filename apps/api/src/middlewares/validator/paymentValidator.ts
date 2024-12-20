import { createValidators, requiredField, requiredMailField, requiredStringField } from "@/helpers/handleValidator";

export const validatePayment = createValidators({
  orderId: requiredStringField("orderId"),
  mail: requiredMailField("mail"),
  totalPrice: requiredField("totalPrice"),
  customerName: requiredStringField("customerName"),
})