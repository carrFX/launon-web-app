import * as Yup from 'yup';

export const userAddressSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(
      /^(\+62|0)?8[1-9][0-9]{6,10}$/,
      "Phone number must be valid, e.g., 0812-3456-7890"
    )
    .required("Phone number is required"),

  address: Yup.string()
    .min(5, "Street address must be at least 5 characters")
    .max(60, "Street address can't exceed 60 characters")
    .required("Street address is required"),

  city: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, "City can only contain letters")
    .min(2, "City name is too short")
    .max(50, "City name is too long")
    .required("City is required"),

  state: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, "State can only contain letters")
    .min(2, "State name is too short")
    .max(50, "State name is too long")
    .required("State is required"),

  postalCode: Yup.string()
    .matches(/^\d{5}$/, "Postal code must be exactly 5 digits")
    .required("Postal code is required"),

  country: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, "Country can only contain letters")
    .min(3, "Country name is too short")
    .max(50, "Country name is too long")
    .required("Country is required"),
});

export default userAddressSchema;
