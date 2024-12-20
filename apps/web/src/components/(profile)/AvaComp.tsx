"use client";
import DeleteAvaComp from "./DeleteAvaComp";
import UpdateAvaComp from "./UpdateAvaComp";
import { toast } from "react-toastify";
import { updateUsernameSchema } from "@/yup/authSchema";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FiEdit } from "react-icons/fi";
import { IUpdateUsername } from "@/type/customerType";
import { updateUsernameFetchDb } from "@/lib/userLib";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getProfileState } from "@/redux/slices/authSlice";
import BtnVerify from "./BtnVerify";
import UpdateEmail from "./UpdateEmail";
import { useEffect } from "react";
import Image from "next/image";

const AvaComp: React.FC = () => {
  const user = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getProfileState())
  },[dispatch])

  const openModal = (type: string) => {
      const modal = document.getElementById(type) as HTMLDialogElement;
      modal?.showModal();
  };

  const handleUpdateUsername = async (username: IUpdateUsername, resetForm: any) => {
    try {
      const { result, ok } = await updateUsernameFetchDb(username);
      if (!ok) throw new Error(result.message);
      dispatch(getProfileState());
      toast.success(result.message as string);
      resetForm();
      const modal = document.getElementById("my_modal_username") as HTMLDialogElement;
      modal?.close();
      window.location.reload();
    } catch (error) {
      toast.error(`${(error as Error).message}`);
    }
  };

  return (
    <div className="relative w-full flex flex-col justify-start items-center py-5 bg-[url('/about/about3.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 w-full flex flex-col justify-center items-center">
        <div
          className="avatar cursor-pointer mb-5"
          onClick={() => openModal("my_modal_avatar")}
        >
          <div className="w-36 md:w-48 rounded-full shadow-2xl border-4 border-grayCustom">
            <Image
              width={500}
              height={500}
              src={
                user.avatar ||
                "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_960_720.png"
              }
              alt={user.username || "avatar"}
            />
          </div>
        </div>
        <dialog id="my_modal_avatar" className="modal">
          <div className="modal-box flex justify-center items-center gap-3 bg-[#0000006b] mx-2">
            <UpdateAvaComp />
            <DeleteAvaComp />
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>

        <div className="w-full flex flex-col justify-center items-center text-center text-black">
          <h1
            className="text-2xl font-bold md:text-4xl text-white tracking-wider cursor-pointer duration-300 flex justify-center items-center gap-2"
            onClick={() => openModal("my_modal_username")}
          >
            {user.username} <FiEdit className="w-5" />
          </h1>
          <dialog id="my_modal_username" className="modal">
            <div className="modal-box flex justify-center items-center gap-3 bg-[#0000006b] mx-2">
              <Formik
                initialValues={{ username: "" }}
                validationSchema={updateUsernameSchema}
                onSubmit={(
                  values: IUpdateUsername,
                  { resetForm }
                ) => handleUpdateUsername(values, resetForm)}
              >
                <Form>
                  <Field
                    type="text"
                    name="username"
                    id="username"
                    className="w-full rounded-xl bg-[#D9D9D9] mb-2 py-1 px-3 text-center placeholder:text-gray-500"
                    placeholder="Write your new username..."
                  />
                  <ErrorMessage
                    name="username"
                    className="text-red-500 text-sm"
                    component="p"
                  />
                  <button
                    type="submit"
                    className="text-sm font-semibold bg-beigeCustom hover:bg-black hover:text-beigeCustom duration-300 px-3 py-2 rounded-full uppercase tracking-wide shadow-xl"
                  >
                    Submit
                  </button>
                </Form>
              </Formik>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
          <p
            onClick={() => {
              user.isGoogle !== true && openModal("modal_update_email");
            }}
            className={`text-sm font-bold text-white md:text-base tracking-wide mt-2 ${
              user.isGoogle !== true && "cursor-pointer"
            }`}
          >
            {user.email}
          </p>
          {!user.verified && <BtnVerify />}
          <UpdateEmail />
        </div>
      </div>
    </div>

    // <div className="w-full flex flex-col  justify-start items-center py-5 bg-[url('/about/about3.jpg')] bg-cover bg-center">
    //   <div className="avatar cursor-pointer mb-5" onClick={() => openModal("my_modal_avatar")}>
    //     <div className="w-36 md:w-48 rounded-full shadow-2xl">
    //       <Image
    //         width={500}
    //         height={500}
    //         src={user.avatar || "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_960_720.png"}
    //         alt={user.username || "avatar"}
    //       />
    //     </div>
    //   </div>
    //   <dialog id="my_modal_avatar" className="modal">
    //     <div className="modal-box flex justify-center items-center gap-3 bg-[#0000006b] mx-2">
    //       <UpdateAvaComp />
    //       <DeleteAvaComp />
    //     </div>
    //     <form method="dialog" className="modal-backdrop">
    //       <button>close</button>
    //     </form>
    //   </dialog>
      
    //   <div className="w-full flex flex-col justify-center items-center text-center text-white">
    //     <h1 className="text-2xl font-bold md:text-4xl tracking-wider cursor-pointer duration-300 flex justify-center items-center gap-2" onClick={() => openModal("my_modal_username")}>{user.username} <FiEdit className="w-5"/></h1>
    //     <dialog id="my_modal_username" className="modal">
    //     <div className="modal-box flex justify-center items-center gap-3 bg-[#0000006b] mx-2">
    //       <Formik 
    //       initialValues={{ username: "" }} 
    //       validationSchema={updateUsernameSchema} 
    //       onSubmit={(values: IUpdateUsername, { resetForm }) => handleUpdateUsername(values, resetForm)}>
    //         <Form>
    //         <Field
    //           type="text"
    //           name="username"
    //           id="username"
    //           className="w-full rounded-xl bg-[#D9D9D9] mb-2 py-1 px-3 text-center placeholder:text-gray-500"
    //           placeholder="Write your new username..."
    //         />
    //         <ErrorMessage name="username" className="text-red-500 text-sm" component="p"/>
    //         <button type="submit" className="text-sm font-semibold bg-beigeCustom hover:bg-black hover:text-beigeCustom duration-300 px-3 py-2 rounded-full uppercase tracking-wide shadow-xl">Submit</button>
    //         </Form>
    //       </Formik>
    //     </div>
    //     <form method="dialog" className="modal-backdrop">
    //       <button>close</button>
    //     </form>
    //   </dialog>
    //     <p onClick={() => {user.isGoogle !== true && openModal("modal_update_email")}} className={`text-sm font-bold md:text-base tracking-wide mt-2 ${user.isGoogle !== true && "cursor-pointer"}`}>{user.email}</p>
    //     {!user.verified && <BtnVerify/>}
    //     <UpdateEmail/>
    //   </div>
    // </div>
  );
};

export default AvaComp;
