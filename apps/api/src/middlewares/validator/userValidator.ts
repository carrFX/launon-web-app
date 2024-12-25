import {
  createValidators,
  requiredMailField,
  requiredStringField,
} from '@/helpers/handleValidator';

export const validateUpdateMailUser = createValidators({
  oldMail: requiredMailField('oldMail'),
  newMail: requiredMailField('newMail'),
  token: requiredStringField('token'),
});

export const validateOnlyVerify = createValidators({
  verifyToken: requiredStringField('verifyToken'),
});

export const validateUsername = createValidators({
  username: requiredStringField('username'),
});

export const validateUpdatePass = createValidators({
  userToken: requiredStringField('userToken'),
  newPassword: requiredStringField('newPassword'),
});
