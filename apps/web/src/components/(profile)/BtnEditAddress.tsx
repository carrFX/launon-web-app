"use client";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";

type Props = {
  addressId: number
}

const BtnEditAddress = (props: Props) => {
    const {addressId} = {...props}
    const [isLoading, setIsLoading] = useState(false);
    const handleEditAddress = async (addressId: number) => {
        const modal = document.getElementById(`modal_update_address${addressId}`) as HTMLDialogElement;
        modal?.showModal();
      }
  return (
    <button
        disabled={isLoading}
        onClick={() => handleEditAddress(addressId)}
        className="btn btn-ghost btn-circle"
      >
        <FiEdit className="w-7 h-7" />
      </button>
  )
}

export default BtnEditAddress