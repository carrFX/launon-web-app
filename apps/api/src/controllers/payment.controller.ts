import { Request, Response } from 'express';
import prisma from '@/prisma';
import midtransClient from 'midtrans-client';
import dotenv from 'dotenv';
import axios from 'axios';
import { existingOrderById } from '@/services/existing-data/order.exist';
import { updatePaymentStatus, updateStatusPaymentAndOrderStatus } from '@/services/update-data/order.update';
dotenv.config();

export const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY!,
  clientKey: process.env.MIDTRANS_CLIENT_KEY!
});

export class PaymentController {
    async createPayment(req: Request, res: Response) {
        try {
            const { orderId, email, totalPrice, customerName } = req.body;
            const order = await prisma.order.findUnique({ where: { id: orderId } });
            if (!order) throw "Order not found";
            const parameter = {
                transaction_details: {
                    "order_id": orderId,
                    "gross_amount": totalPrice
                },
                customer_details: {
                    "first_name": customerName,
                    "email": email,
                },
                item_details:{
                    "id": orderId,
                    "price": totalPrice,
                    "quantity": 1,
                    "name": "Comlplete Wash",
                },
            };
            const token = await snap.createTransaction(parameter);

            return res.status(200).send({ status: "ok", message: "Success", data: token });
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send({ status: "error", message: error.message });
              }
            res.status(400).send({ status: "error", message: error });
        }
    }
    async callbackPayment(req: Request, res: Response) {
        try {
            const statusResponse = await snap.transaction.notification(req.body);
            const orderId = statusResponse.order_id;
            const transactionStatus = statusResponse.transaction_status;
            const fraudStatus = statusResponse.fraud_status;
    
            const orderData = await existingOrderById(orderId);
            if (!orderData) throw new Error("Order not found");
    
            if (transactionStatus == 'capture' || transactionStatus == 'settlement') {
                if (fraudStatus == 'accept') {
                    const currentOrder = await existingOrderById(orderId);
                    if(!currentOrder) throw "Order not found";
                    if(currentOrder.status == 'waiting_for_payment'){ 
                      await updateStatusPaymentAndOrderStatus(orderId, 'paid', 'ready_for_delivery')
                        const pdrData = {
                            orderId: orderId,
                            distance: currentOrder.pickupDeliveryRequests[0].distance,
                            driverId: currentOrder.pickupDeliveryRequests[0].driverId,
                            fromAddressId: currentOrder.pickupDeliveryRequests[0].toAddressId,
                            toAddressId: currentOrder.pickupDeliveryRequests[0].fromAddressId,
                            requestType: 'deliver',
                            status: 'wait_to_pickup_at_outlet',
                        }
                        const pdr = await axios.post(`${process.env.BACKEND_URL}/api/pdr/`, pdrData);
                        if(!pdr) throw "Error creating Pickup Delivery Request";
                    } else {
                        await updatePaymentStatus(orderId, 'paid');
                    }
                }
            }
    
            return res.status(200).send({ status: "ok", message: "Success", data: orderData });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : error;
            return res.status(400).send({ status: "error", message: errorMessage });
        }
    }
}
