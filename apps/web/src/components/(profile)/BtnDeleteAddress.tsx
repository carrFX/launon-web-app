import { deleteAddressFetchDb } from "@/lib/addressLib";
import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";

type Props = {
  addressId: number
}
const BtnDeleteAddress = (props: Props) => {
    const {addressId} = {...props}
    const [isLoading, setIsLoading] = useState(false);
    const handleDeleteAddress = async (id: number) => {
        setIsLoading(true)
        const { result, ok } = await deleteAddressFetchDb(id)
        try {
            if(!ok) throw result.message
            toast.success(result.message as string)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false)
    }
  return (
      <>
        <button
          disabled={isLoading}
          onClick={() => handleDeleteAddress(addressId)}
          className="btn btn-ghost btn-circle hover:text-red-600"
        >
          <MdDeleteOutline className="w-7 h-7" />
        </button>
      </>
  );
};

export default BtnDeleteAddress;
