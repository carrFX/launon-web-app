"use client"
import { useParams, useRouter } from "next/navigation"
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { updateMailSchema } from "@/yup/authSchema";
import { toast } from "react-toastify";
import { updateMailFetchDb } from "@/lib/userLib";
import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";

const UpdateMail = () => {
  const user = useAppSelector((state) => state.auth)
  const router = useRouter()
  const params = useParams()
  const [isLoading, setIsloading] = useState(false)

  const handleUpdateMail = async (values: any, resetForm: any) => {
    setIsloading(true)
    const oldEmail = values.oldEmail
    const newEmail = values.newEmail
    const token = params.token as string
    try {
      const {result,ok} = await updateMailFetchDb({oldEmail, newEmail,token})
      if(!ok) throw result.message
      toast.success(result.message)
      resetForm();
      router.push('/user/profile/' + user.id)
    } catch (error) {
      toast.error(error as string)
    }
    setIsloading(false)
  }
  return (
    <div className="bg-lightCustom w-full min-h-screen flex flex-col justify-center items-center">
      <h1 className="w-full text-2xl font-bold text-center">Set Your New Mail</h1>
      <Formik
          initialValues={{ oldEmail: '', newEmail: '' }}
          validationSchema={updateMailSchema}
          onSubmit={(values, { resetForm }) => {
            handleUpdateMail(values, resetForm);
          }}
        >
          <Form
            action=""
            className="flex w-full flex-col justify-center items-center text-center md:w-1/2 mt-5 md:mt-0 py-4"
          >

            <label htmlFor="oldMail" className="text-black text-xl tracking-wide">
              Please Enter Your Old Mail :
            </label>
            <Field
              type="text"
              name="oldEmail"
              id="oldEmail"
              placeholder="oldmail@gmail.com"
              className="w-[80%] rounded-lg bg-[#D9D9D9] mb-2 md:mt-1 py-1 text-center placeholder:text-gray-500"
            />
            <ErrorMessage
              name="oldEmail"
              component="div"
              className="text-red-500"
            />
            <label htmlFor="newMail" className="text-black text-xl tracking-wide">
              Enter Your New Mail :
            </label>
            <Field
              type="text"
              name="newEmail"
              id="newEmail"
              placeholder="newmail@gmail.com"
              className="w-[80%] rounded-lg bg-[#D9D9D9] mb-2 md:mt-1 py-1 text-center placeholder:text-gray-500"
            />
            <ErrorMessage
              name="newEmail"
              component="div"
              className="text-red-500"
            />

            <button
              type="submit"
              className="w-[80%] rounded-full duration-300 bg-beigeCustom text-black mb-2 hover:bg-grayCustom hover:text-beigeCustom font-bold text-2xl py-1 tracking-wider hover:scale-105 uppercase"
              disabled={isLoading}
            >
              {isLoading ? 'Proccessing..' : 'Submit'}
            </button>
          </Form>
        </Formik>
    </div>
  )
}

export default UpdateMail