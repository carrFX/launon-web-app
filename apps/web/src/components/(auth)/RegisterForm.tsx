'use client';
import authImg from '@/data/dummy.json';
import Image from 'next/image';
import Link from 'next/link';
import { RiTShirtAirLine } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { registerSchema } from '@/yup/authSchema';
import { IRegisterUser } from '@/type/authType';
import { toast } from 'react-toastify';
import { registerFetchDb } from '@/lib/authLib';
import { useState } from 'react';

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleRegister = async (values: IRegisterUser, resetForm: any) => {
    setIsLoading(true);
    try {
      const {result, ok} = await registerFetchDb(values);
      if(!ok) throw result.message;
      toast.success(result.message);
      resetForm();
    } catch (error) {
      toast.error(error as string);
    }
    setIsLoading(false);
  };
  return (
    <div className="relative w-full min-h-screen py-2 overflow-hidden bg-beigeCustom flex justify-center items-center">
      {/* background */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={authImg.auth}
          alt="auth_image"
          className="w-full h-full object-cover"
          width={1200}
          height={800}
          style={{ objectPosition: 'bottom center' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 bg-[#000000a5] md:py-4 rounded-lg min-w-[90%] min-h-[90%] shadow-lg flex  flex-wrap justify-center items-center">
        <div className="flex flex-col justify-center text-center items-center text-white px-3 md:w-1/2 mt-10 md:mt-0">
          <h1 className="text-xl md:text-2xl font-bold pb-2">
            Welcome To LaunON.
          </h1>
          <p className="border-t-2 border-t-beigeCustom text-lg md:text-xl font-medium pt-1">
            Sign up now and let us handle your laundry!
          </p>
          <RiTShirtAirLine className="w-36 h-36 md:w-48 md:h-48 md:my-9" />
          <h2 className="text-xl md:text-3xl font-bold">
            &quot;Clean Is <span className="text-beigeCustom">ON.</span> With
            Laun<span className="text-beigeCustom">ON.</span>&quot;
          </h2>
        </div>

        {/* Form  */}
        <Formik
          initialValues={{ username: '', email: '' }}
          validationSchema={registerSchema}
          onSubmit={(values, { resetForm }) => {
            handleRegister(values, resetForm);
          }}
        >
          <Form
            action=""
            className="flex w-full flex-col justify-center items-center text-center md:w-1/2 mt-5 md:mt-0 py-4"
          >
            <label
              htmlFor="username"
              className="text-white text-xl tracking-wide"
            >
              Username :
            </label>
            <Field
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username..."
              className="w-[80%] rounded-lg bg-[#D9D9D9] mb-2 md:mt-1 py-1 text-center placeholder:text-gray-500"
              autoFocus 
              required
            />
            <ErrorMessage
              name="username"
              component="div"
              className="text-red-500"
            />

            <label htmlFor="email" className="text-white text-xl tracking-wide">
              Email :
            </label>
            <Field
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
              className="w-[80%] rounded-lg bg-[#D9D9D9] mb-2 md:mt-1 py-1 text-center placeholder:text-gray-500"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500"
            />

            <button
              type="submit"
              className="w-[80%] rounded-full duration-300 bg-beigeCustom text-black mb-2 hover:bg-grayCustom hover:text-beigeCustom font-bold text-2xl py-1 tracking-wider hover:scale-105"
              disabled={isLoading}
            >
              {isLoading ? 'Registered...' : 'Register'}
            </button>

            <p className="text-sm text-white md:text-lg font-medium tracking-wide my-1">
              - OR -
            </p>
            <Link href={'http://localhost:8000/api/google/login'} className="w-[80%] rounded-full duration-300 bg-beigeCustom text-black mb-2 hover:bg-grayCustom hover:text-beigeCustom font-bold text-xl md:text-2xl py-1 tracking-wider hover:scale-105 flex justify-center items-center gap-3">
              <FcGoogle />
              Login With Google
            </Link>
            <p className="border-t border-t-beigeCustom text-sm text-white md:text-lg font-medium pt-1">
              Already have an account?{' '}
              <Link
                href={'/auth/login'}
                className="text-beigeCustom font-semibold border-b border-b-transparent hover:border-b-beigeCustom"
              >
                Login
              </Link>
            </p>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default RegisterForm;
