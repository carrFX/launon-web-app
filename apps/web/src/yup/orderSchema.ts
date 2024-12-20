import * as Yup from 'yup';

export const searchOrderByIdSchema = Yup.object({
  orderId: Yup.string().matches(/^\d+$/, 'Order ID must be a number').required('Order ID is required'),
});
