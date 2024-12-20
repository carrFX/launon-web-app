export type OutletData = {
  token: string;
  outletId: number;
  outletName: string;
  outletEmail: string;
};

export type OrderData = {
  id: number;
  userId: number;
  addressId: number;
  outletId: number;
  package: string | null;
  status: string; // contoh: "weighed", "picked_up", dll.
  pickupSchedule: string;
  totalWeight: number | null;
  totalItems: number;
  totalPrice: number | null;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
  pickupDeliveryRequests: PickupDeliveryRequest[];
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
};

export type OrderItemData = {
  shirt: number;
  longShirt: number;
  pants: number;
  longPant: number;
  veil: number;
  underwear: number;
  bedsheet: number;
  pillowCase: number;
  blanket: number;
  towel: number;
  curtain: number;
};
