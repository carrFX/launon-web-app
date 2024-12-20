"use client"
import { onlyVerifyFetchDb } from "@/lib/userLib"
import { useAppSelector } from "@/redux/hooks"
import { useParams } from "next/navigation"
import { useState } from "react"
import { toast } from "react-toastify"

const VerifyAccount = () => {
  const user = useAppSelector((state) => state.auth)
  const [isLoading, setIsLoading] = useState(false)
  const params = useParams()
  const handleVerify = async () => {
    setIsLoading(true)
    const token = params.token as string
    try {
      const { result, ok } = await onlyVerifyFetchDb({token})
      if(!ok) throw result.message
      toast.success(result.message)
      window.location.reload()
    } catch (error) {
      toast.error(error as string)
    }
    setIsLoading(false)
  }
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center text-center">
        {user.verified ? (
          <h1 className="text-2xl font-bold text-black">Your Account Already Verified</h1>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-black">Verify Your Account Here</h1>
            <button
              className="text-lg font-semibold px-3 py-2 rounded-xl bg-beigeCustom hover:bg-black text-black hover:text-beigeCustom duration-300"
              onClick={() => handleVerify()}
              disabled={isLoading}
            >{isLoading ? 'Proccessing..':'Verify Now'}</button>
          </>
        )}
    </div>
  )
}

export default VerifyAccount