'use client';
import { createPaymentFetchDb } from "@/lib/paymentLib"
import { NumberMatcher } from "cypress/types/net-stubbing";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
type Props = {
    orderId: NumberMatcher
    customerName: string
    email: string
    totalPrice: number
}
declare global {
    interface Window {
      snap: any;
    }
  }
const insertSnapScript = () => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
        script.setAttribute('data-client-key', process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!);
        script.onload = () => resolve(true);
        script.addEventListener('error', () => resolve(false));
        document.body.appendChild(script);
    })
}

const BtnPayment = (props:Props) => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        insertSnapScript();
    },[])

    const handlePaymentClick = async (data: Props) => {
        setIsLoading(true)
        try {
            const { result, ok } = await createPaymentFetchDb(data);
            if(!ok) throw result.message
            const snapToken = result.data.token;
            window.snap.pay(snapToken);
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }
    
  return (
    <button
        onClick={() => handlePaymentClick(props)} 
        disabled={isLoading}
        className="mt-1 mb-2 md:mb-0 md:mt-2 w-full text-center cursor-pointer bg-grayCustom text-black py-2 hover:bg-black hover:text-beigeCustom px-4 rounded-full transition duration-200 shadow-sm shadow-[#00000048] md:text-lg uppercase tracking-wide my-1"
    >
        {isLoading ? 'Processing..' : 'Pay Now'}
    </button>
  )
}

export default BtnPayment