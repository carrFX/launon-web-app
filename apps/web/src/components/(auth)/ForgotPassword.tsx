"use client"
import { mailResetPassFetchDb } from "@/lib/sendMailLib";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

const ForgotPassword = () => {
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState("");

  const handleSendMail = async (email: any) => {
    setIsloading(true);
    const schema = Yup.string().email("Invalid email format").required("Email is required");

    try {
      await schema.validate(email)
      const {result,ok} = await mailResetPassFetchDb({email: email});
      if(!ok) throw new Error(result.message);
      toast.success(result.message);
      setError("");
      resetForm();
      closeModal();
    } catch (error: any) {
      if(error instanceof Yup.ValidationError) setError(error.message);
      toast.error(error.message);
      resetForm();
    }
    setIsloading(false);
  };

  const closeModal = () => {
    const modalCheckbox = document.getElementById("modal_forgot_password") as HTMLInputElement;
    modalCheckbox.checked = false;
  };

  const resetForm = () => {
    const inputField = document.getElementById("sendMail") as HTMLInputElement;
    inputField.value = "";
  }

  return (
    <div className="text-sm text-white md:text-lg font-medium flex justify-center items-center gap-1">
      Forgot Your Password?{" "}
      <label htmlFor="modal_forgot_password" className="text-beigeCustom font-semibold border-b border-b-transparent hover:border-b-beigeCustom cursor-pointer">
        Reset Password
      </label>

      <input type="checkbox" id="modal_forgot_password" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box text-white bg-[#0000006b] flex flex-col justify-center items-center text-center">
          <h3 className="text-lg font-bold mb-2">Send your Mail to Reset Password!</h3>
          <input
            type="text"
            name="sendMail"
            placeholder="yourmail@mail.com"
            id="sendMail"
            className="text-black w-[80%] rounded-lg bg-[#D9D9D9] mb-2 md:mt-1 py-1 text-center placeholder:text-gray-500"
            autoFocus
          />
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <button
            type="button"
            onClick={() => handleSendMail((document.getElementById("sendMail") as HTMLInputElement)?.value)}
            className="cursor-pointer w-[80%] rounded-full duration-300 bg-beigeCustom text-black hover:bg-grayCustom hover:text-beigeCustom font-bold text-2xl py-1 tracking-wider hover:scale-105"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Mail"}
          </button>
          <div className="modal-action flex justify-center items-center text-center w-full">
            <label
              htmlFor="modal_forgot_password"
              className="w-[80%] rounded-full duration-300 bg-grayCustom text-black mb-2 hover:bg-grayCustom hover:text-beigeCustom font-bold text-2xl py-1 tracking-wider hover:scale-105"
            >
              Cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
