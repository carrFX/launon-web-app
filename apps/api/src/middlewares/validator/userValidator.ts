import { createValidators, requiredMailField, requiredStringField } from "@/helpers/handleValidator";

export const validateUpdateMailUser = createValidators({
    oldMail: requiredMailField("oldMail"),
    newMail: requiredMailField("newMail"),
    token: requiredStringField("token"),
})

export const validateOnlyVerify = createValidators({
    verifiedToken: requiredStringField("verifiedToken"),
})

export const validateUsername = createValidators({
    username: requiredStringField("username"),
})

export const validateUpdatePass = createValidators({
    userId: requiredStringField("userId"),
    oldPassword: requiredStringField("oldPassword"),
    newPassword: requiredStringField("newPassword"),
})