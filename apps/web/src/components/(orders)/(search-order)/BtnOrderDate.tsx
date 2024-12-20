"use client";
import { ErrorMessage, Field, Form, Formik } from "formik";

type Props = {
    isLoading: boolean;
    handleSubmit: (values: any, resetForm: any) => void;
    byDateModal: HTMLDialogElement
}

const BtnOrderDate = (props:Props) => {
    const {isLoading, handleSubmit, byDateModal} = {...props}
  return (
    <>
        <button onClick={() => byDateModal?.showModal()} className="text-sm font-semibold bg-black text-white duration-300 px-3 py-2 rounded-full uppercase tracking-wide shadow-xl hover:text-beigeCustom">order date</button>
        <dialog id="order_by_date" className="modal">
            <div className="modal-box w-11/12 max-w-3xl bg-[#0000006b]">
                <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white font-extrabold hover:text-beigeCustom">
                    ✕
                </button>
                </form>
                <Formik
                    initialValues={{date: new Date().toISOString().slice(0, 10),}}
                    onSubmit={(values, {resetForm}) => handleSubmit(values, resetForm)}>
                    <Form>
                    <div className="flex justify-center items-center flex-col">
                        <Field
                            type="date"
                            name="date"
                            id="date"
                            className="w-[80%] px-14 cursor-pointer rounded-lg bg-[#D9D9D9] mb-2 md:mt-1 py-1 text-center placeholder:text-gray-500"
                        />
                        <ErrorMessage
                            name="date"
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

export default BtnOrderDate