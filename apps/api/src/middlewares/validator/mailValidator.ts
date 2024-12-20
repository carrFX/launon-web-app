import { createValidators, requiredMailField } from "@/helpers/handleValidator";

export const validateMailBody = createValidators({
  mail: requiredMailField('mail'),
})
  