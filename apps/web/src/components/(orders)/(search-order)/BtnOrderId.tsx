"use client";
import { searchOrderByIdSchema } from "@/yup/orderSchema";
import { ErrorMessage, Field, Form, Formik } from "formik";

type Props = {
    isLoading: boolean,
    handleSubmit: (values: any, resetForm: any) => void,
    byIdModal: HTMLDialogElement
}
const BtnOrderId = (props: Props) => {
    const {isLoading, handleSubmit, byIdModal} = {...props}
  return (
    <>
        <button onClick={() => byIdModal?.showModal()} className="text-sm font-semibold bg-black text-white duration-300 px-3 py-2 rounded-full uppercase tracking-wide shadow-xl hover:text-beigeCustom">Order Id</button>
        <dialog id="order_by_id" className="modal">
            <div className="modal-box w-11/12 max-w-3xl bg-[#0000006b]">
                <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white font-extrabold hover:text-beigeCustom">
                    ✕
                </button>
                </form>
                
                <Formik
                    validationSchema={searchOrderByIdSchema}
                    initialValues={{orderId: ""}}
                    onSubmit={(values, {resetForm}) => handleSubmit(values, resetForm)}>
                    <Form>
                    <div className="flex justify-center items-center flex-col">
                        <Field
                            type="text"
                            name="orderId"
                            id="orderId"
                            placeholder="Search By Order Id..."
                            className="w-[80%] px-14 cursor-pointer rounded-lg bg-[#D9D9D9] mb-2 md:mt-1 py-1 text-center placeholder:text-gray-500"
                        />
                        <ErrorMessage
                            name="orderId"
                            component="div"
                            className="text-red-500"
                        />
                    </div>
                    <div className="flex flex-col justify-center items-center mt-5">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-[80%] rounded-full duration-300 bg-beigeCustom text-black mb-2 hover:bg-grayCustom hover:text-beigeCustom font-bold text-2xl py-1 tracking-wider hover:scale-105"
                        >
                            {isLoading ? 'Proccessing..':'Search'}
                        </button>
                    </div>
                    </Form>
                </Formik>
            </div>
        </dialog>
    </>
  )
}

export default BtnOrderId
