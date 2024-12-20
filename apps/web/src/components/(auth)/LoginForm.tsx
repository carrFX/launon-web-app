'use client';
import authImg from '@/data/dummy.json';
import Image from 'next/image';
import Link from 'next/link';
import { RiTShirtAirLine } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { loginSchema } from '@/yup/authSchema';
import { ILoginUser } from '@/type/authType';
import { toast } from 'react-toastify';
import { loginFetchDb } from '@/lib/authLib';
import ForgotPassword from './ForgotPassword';
import { useState } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { loginAction } from '@/redux/slices/authSlice';
import { useRouter, useSearchParams } from 'next/navigation';

const LoginForm = () => {
  const dispatch = useAppDispatch()
  const redirectRoute = useSearchParams()?.get('redirect') as string;
  const router = useRouter();
  const [isLoading, setIsloading] = useState(false);
  const handleLogin = async (values: ILoginUser, resetForm: any) => {
    setIsloading(true);
    try {
      const {result, ok} = await loginFetchDb(values);
      if(!ok) throw result.message;
      dispatch(loginAction(result.data))
      toast.success(result.message);
      resetForm();
      redirectRoute ? router.push(redirectRoute) : router.push('/');
    } catch (error) {
      toast.error(error as string);
    }
    setIsloading(false);
  };
  
  return (
    <div className="relative w-full min-h-screen py-2 overflow-hidden bg-beigeCustom flex justify-center items-center">
      {/* Gambar background */}
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

      {/* Konten */}
      <div className="relative z-10 bg-[#000000a5] rounded-lg min-w-[90%] min-h-[90%] py-8 shadow-lg flex  flex-wrap justify-center items-center">
        <div className="flex flex-col justify-center text-center items-center text-white px-3 md:w-1/2 mt-10 md:mt-0 md:px-7">
          <h1 className="text-xl md:text-2xl font-bold pb-2">
            Welcome To LaunON.
          </h1>
          <p className="border-t-2 border-t-beigeCustom text-lg md:text-xl font-medium pt-1">
            Login to LaunON if you can because your laundry won&apos;t wash
            itself !
          </p>
          <RiTShirtAirLine className="w-36 h-36 md:w-48 md:h-48 md:my-9" />
          <h2 className="text-xl md:text-3xl font-bold">
            &quot;Clean Is <span className="text-beigeCustom">ON.</span> With
            Laun<span className="text-beigeCustom">ON.</span>&quot;
          </h2>
        </div>

        {/* Form  */}
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={(values, { resetForm }) => {
            handleLogin(values, resetForm);
          }}
        >
          <Form
            action=""
            className="flex w-full flex-col justify-center items-center text-center md:w-1/2 mt-5 md:mt-0 py-4"
          >
            <label htmlFor="email" className="text-white text-xl tracking-wide">
              Email :
            </label>
            <Field
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
              className="w-[80%] rounded-lg bg-[#D9D9D9] mb-2 md:mt-1 py-1 text-center placeholder:text-gray-500"
              autoFocus
              required
              autoComplete="email"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm"
            />

            <label
              htmlFor="password"
              className="text-white text-xl tracking-wide"
            >
              Password :
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
              className="text-red-500 text-sm"
            />

            <button
              type="submit"
              className="w-[80%] rounded-full duration-300 bg-beigeCustom text-black mb-2 hover:bg-grayCustom hover:text-beigeCustom font-bold text-2xl py-1 tracking-wider hover:scale-105"
              disabled={isLoading}
            >
              {isLoading ? 'Logged In...' : 'Login'}
            </button>
            <ForgotPassword/>

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
                href={'/auth/register'}
                className="text-beigeCustom font-semibold border-b border-b-transparent hover:border-b-beigeCustom"
              >
                Sign Up
              </Link>
            </p>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
