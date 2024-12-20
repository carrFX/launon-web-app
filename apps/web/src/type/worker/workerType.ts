export interface WorkerDetail {
  id: number;
  name: string;
  role: string;
  email: string;
}

export interface Attendance {
  id: number;
  workerId: number;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
}

export interface DriverServicesProps {
  workerDetail: WorkerDetail | null;
}

export interface PickupDeliveryRequest {
  id: number;
  orderId: number;
  distance: number;
  requestType: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  order: {
    id: number;
    status: string;
    pickupSchedule: string;
    paymentStatus: string;
  };
  fromAddress: {
    address: string;
    city: string;
  };
  toAddress: {
    address: string;
    city: string;
  };
}

export interface Worker {
  id: number;
  outletId: number;
  name: string;
  password: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: number;
  userId: number;
  addressId: number;
  outletId: number;
  package: any;
  status: string;
  pickupSchedule: string;
  totalWeight: number;
  totalItems: number;
  totalPrice: number;
  paymentStatus: string;
  paymentLink: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface WorkHistory {
  id: number;
  workerId: number;
  orderId: number;
  station: string;
  pickupDelivery: any;
  createdAt: string;
  updatedAt: string;
  worker: Worker;
  order: Order;
  pickupDeliveryRequest: any;
}

export type AttendanceRecord = {
  id: number;
  workerId: number;
  date: string; // Tanggal dalam format ISO
  checkIn: string; // Waktu masuk dalam format ISO
  checkOut: string; // Waktu keluar dalam format ISO
  createdAt: string; // Tanggal dan waktu pencatatan dalam format ISO
};

export interface OutletWorker {
  id: number;
  outletId: number;
  name: string;
  password: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}
