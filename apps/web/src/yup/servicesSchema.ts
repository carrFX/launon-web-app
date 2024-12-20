import * as Yup from 'yup';

export const inputRequestPickupSchema = Yup.object({
  pickupSchedule: Yup.date()
    .min(new Date(), 'Pickup date must be in the future')
    .required('Pickup date is required'),
});