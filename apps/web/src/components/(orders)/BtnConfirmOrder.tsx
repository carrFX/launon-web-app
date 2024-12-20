'use client'

import { confirmOrderFetchDb } from "@/lib/orderLib"
import { useState } from "react"
import { toast } from "react-toastify"

const BtnConfirmOrder = (props: {orderId: number} ) => {
    const {orderId} = {...props}
    const [isLoading, setIsLoading] = useState(false)

    const handleConfirmOrder = async (orderId: number) => {
        setIsLoading(true)
        try {
            const { result, ok } = await confirmOrderFetchDb({orderId: orderId})
            if(!ok) throw result.message
            toast.success(result.message as string)
            window.location.reload()
        } catch (error) {
            toast.error(error as string)
            console.log(error)
        }
        setIsLoading(false)
    }
  return (
    <button
        onClick={() => handleConfirmOrder(orderId)} 
        disabled={isLoading}
        className="mt-3 mb-2 md:mb-0 md:mt-5 cursor-pointer bg-black text-white py-2 hover:scale-110 px-4 rounded-full transition duration-200 shadow-sm shadow-[#00000048] text-base md:text-lg uppercase tracking-wide my-1 flex items-center gap-2"
    >
        {isLoading ? 'Processing..' : 'Confirm Order'}
    </button>
  )
}

export default BtnConfirmOrder