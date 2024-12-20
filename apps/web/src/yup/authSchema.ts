import * as Yup from 'yup';

export const registerSchema = Yup.object({
  username: Yup.string()
    .min(4, 'Username must be at least 4 characters')
    .required('Username is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required')
});

export const setPasswordSchema = Yup.object({
  password: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{5,})/,
      'The password must be a minimum of 5 characters and must consist of uppercase letters, lowercase letters and numbers.',
    ),
    confirmPassword: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
})

export const loginSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{5,})/,
      'The password must be a minimum of 5 characters and must consist of uppercase letters, lowercase letters and numbers.',
    ),
});

export const updateAvaSchema = Yup.object().shape({
  file: Yup.mixed()
    .required('File is required')
    .test('fileSize', 'File size must be less than or equal to 1MB', (value) => {
      return value && (value as File).size <= 1048576;
    })
    .test('fileType', 'Unsupported file format', (value) => {
      return value && ['image/jpeg','image/jpg', 'image/png', 'image/gif'].includes((value as File).type);
    }),
});

export const updateUsernameSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, 'Username must be at least 4 characters')
    .required('Username is required'),
});

export const sendMailForgotPasswordSchema = Yup.object().shape({
  sendMaail: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

export const updateMailSchema = Yup.object().shape({
  oldEmail: Yup.string()
  .email('Invalid email address')
  .required('Email is required'),
  newEmail: Yup.string()
  .email('Invalid email address')
  .required('Email is required'),
})