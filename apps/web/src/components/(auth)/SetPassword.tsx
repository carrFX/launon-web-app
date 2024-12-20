"use client"
import { useParams, useRouter } from "next/navigation"
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { setPasswordSchema } from "@/yup/authSchema";
import { setPassFetchDb } from "@/lib/authLib";
import { toast } from "react-toastify";

const SetPassword = () => {
  const router = useRouter()
  const params = useParams()

  const handleSetPass = async (values: any, resetForm: any) => {
    const verifyToken = params.token as string
    const password = values.password
    try {
      const {result,ok} = await setPassFetchDb({verifyToken : verifyToken,password})
      if(!ok) throw result.message
      toast.success(result.message)
      resetForm();
      router.push('/auth/login')
    } catch (error) {
      toast.error(error as string)
    }
  }
  return (
    <div className="bg-lightCustom w-full min-h-screen flex flex-col justify-center items-center">
      <h1 className="w-full text-2xl font-bold text-center">Setting password</h1>
      <Formik
          initialValues={{ username: '', email: '' }}
          validationSchema={setPasswordSchema}
          onSubmit={(values, { resetForm }) => {
            handleSetPass(values, resetForm);
          }}
        >
          <Form
            action=""
            className="flex w-full flex-col justify-center items-center text-center md:w-1/2 mt-5 md:mt-0 py-4"
          >

            <label htmlFor="password" className="text-black text-xl tracking-wide">
              Set Your Password :
            </label>
            <Field
              type="password"
              name="password"
              id="password"
              placeholder="********"
              className="w-[80%] rounded-lg bg-[#D9D9D9] mb-2 md:mt-1 py-1 text-center placeholder:text-gray-500"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500"
            />
            <label htmlFor="confirmPassword" className="text-black text-xl tracking-wide">
              Confirm Your Password :
            </label>
            <Field
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="********"
              className="w-[80%] rounded-lg bg-[#D9D9D9] mb-2 md:mt-1 py-1 text-center placeholder:text-gray-500"
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="text-red-500"
            />

            <button
              type="submit"
              className="w-[80%] rounded-full duration-300 bg-beigeCustom text-black mb-2 hover:bg-grayCustom hover:text-beigeCustom font-bold text-2xl py-1 tracking-wider hover:scale-105 uppercase"
            >
              next
            </button>

          </Form>
        </Formik>
    </div>
  )
}

export default SetPassword