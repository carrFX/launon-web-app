"use client"
import { mailOnlyVerifyFetchDb } from "@/lib/sendMailLib"
import { useAppSelector } from "@/redux/hooks"
import { useState } from "react"
import { toast } from "react-toastify"

const BtnVerify = () => {
  const user = useAppSelector((state) => state.auth)
  const [isLoading, setIsloading] = useState(false)
  const SendMailOnlyVerify = async () => {
    setIsloading(true)
    try {
      const {result, ok} = await mailOnlyVerifyFetchDb({email: user.email})
      if(!ok) throw result.message
      toast.success(result.message)
    } catch (error) {
      toast.error(error as string)
    }
    setIsloading(false)
  }
  return (
    <>
    <button 
    disabled={isLoading}
    onClick={() => SendMailOnlyVerify()} className="text-black hover:text-beigeCustom bg-grayCustom hover:bg-black duration-300 rounded-full text-lg md:text-sm font-semibold px-2 py-1 mt-1">{isLoading ? 'Proccessing..':'Verify your Account'}</button></>
  )
}

export default BtnVerify