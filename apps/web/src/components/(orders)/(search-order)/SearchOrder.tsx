'use client';
import { IoIosSearch } from "react-icons/io";
import BtnOrderId from "./BtnOrderId";
import BtnOrderDate from "./BtnOrderDate";
import { useState } from "react";
import { searchOrderFetchDb } from "@/lib/orderLib";

type Props = {
  handleSubmitSearch: (values: any, resetForm: any) => void;
  isLoading: boolean;
  selectSearchModal: HTMLDialogElement;
  byIdModal: HTMLDialogElement;
  byDateModal: HTMLDialogElement;
}

const SearchOrder = (props: Props) => {
  const { handleSubmitSearch, isLoading, selectSearchModal, byIdModal, byDateModal } = {...props};
  return (
    <div className="my-4">
      <button onClick={() => selectSearchModal?.showModal()} className="flex justify-center items-center gap-1 cursor-pointer hover:bg-black hover:text-beigeCustom bg-beigeCustom text-black py-2 px-4 rounded-full transition duration-200 shadow-xl shadow-[#00000048] text-base uppercase tracking-wide">Search Order <IoIosSearch/></button>
      <dialog id="modal_search_order" className="modal">
        <div className="modal-box flex justify-center items-center gap-3 bg-[#0000006b] mx-2">
          <BtnOrderId isLoading={isLoading} handleSubmit={handleSubmitSearch} byIdModal={byIdModal}/>
          <BtnOrderDate isLoading={isLoading} handleSubmit={handleSubmitSearch} byDateModal={byDateModal}/>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default SearchOrder;