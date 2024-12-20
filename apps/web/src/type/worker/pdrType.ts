export type Address = {
  id: number;
  userId: number | null;
  outletId: number | null;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isMain: boolean;
  phone: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
};

export type Order = {
  id: number;
  userId: number;
  addressId: number;
  outletId: number;
  package: string | null;
  status: string;
  pickupSchedule: string;
  totalWeight: number | null;
  totalItems: number;
  totalPrice: number | null;
  paymentStatus: string;
  paymentLink: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Driver = {
  id: number;
  outletId: number;
  name: string;
  password: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export type PickupDeliveryRequest = {
  id: number;
  orderId: number;
  distance: number;
  driverId: number;
  fromAddressId: number;
  toAddressId: number;
  requestType: string; // contoh: "pickup" atau "delivery"
  status: string; // contoh: "done", "pending", dll.
  createdAt: string; // Tanggal dalam format ISO
  updatedAt: string;
  fromAddress?: Address; // Tambahkan properti opsional
  toAddress?: Address; // Tambahkan properti opsional
  order?: Order; // Tambahkan properti opsional
  driver?: Driver; // Tambahkan properti opsional
};
