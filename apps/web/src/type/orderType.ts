export interface IOrder {
  userId(userId: any): import('react').ReactNode;
  id: number;
  addressId: number;
  outletId: { id: number; name: string } | null;
  pickupSchedule: String;
  status: String;
  paymentStatus: String;
  paymentLink: String;
  totalItems: number;
  totalPrice: number | null;
  totalWeight: number | null;
  createdAt: String;
  user?: any | null;
  outlet?: any | null;
}

export interface IOrderDetail {
  id: number;
  createdAt: String;
  pickupSchedule: String;
  status: String;
  paymentStatus: String;
  totalItems: number;
  totalPrice: number | null;
  totalWeight: number | null;
}

export interface ICustomerDetail {
  username: String;
  email: String;
  address: String;
}
