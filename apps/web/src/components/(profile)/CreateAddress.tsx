'use client';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import userAddressSchema from '@/yup/addressSchema';
import { ICreateCustomerAddress } from '@/type/customerType';
import { createAddressFetchDb } from '@/lib/addressLib';
import { toast } from 'react-toastify';
import { TbMapPinPlus } from 'react-icons/tb';
import { useParams } from 'next/navigation';
import { useState } from 'react';
type AddressCompProps = {
  outletId?: number; // Tipe outletId
};
const CreateAddress: React.FC<AddressCompProps> = ({ outletId }) => {
  const userId = useParams().id;
  const [isLoading, setIsLoading] = useState(false);
  const openModal = () => {
    const modal = document.getElementById(
      'modal_create_address',
    ) as HTMLDialogElement;
    modal?.showModal();
  };

  const handleCreateAddress = async (
    values: ICreateCustomerAddress,
    resetForm: any,
  ) => {
    setIsLoading(true);
    const modal = document.getElementById(
      'modal_create_address',
    ) as HTMLDialogElement;
    const { result, ok } = await createAddressFetchDb({
      outletId: outletId ? outletId : null,
      ...values,
    });
    try {
      if (!ok) throw result.message;
      toast.success(result.message as string);
      resetForm();
      modal?.close();
      window.location.reload();
    } catch (error) {
      toast.error(`${error as Error}`);
    }
    setIsLoading(false);
  };

  const initialValues: ICreateCustomerAddress = {
    userId: +userId,
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    phone: '',
  };
  return (
    <div>
      <button
        className="text-sm flex justify-center items-center gap-1 font-semibold bg-grayCustom text-black hover:bg-black hover:text-beigeCustom duration-300 px-3 py-2 rounded-full tracking-wide shadow-xl"
        onClick={() => openModal()}
      >
        Add Address <TbMapPinPlus className="w-5 h-5" />
      </button>
      <dialog id="modal_create_address" className="modal">
        <div className="modal-box w-11/12 max-w-3xl bg-[#0000006b]">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white font-extrabold hover:text-beigeCustom">
              ✕
            </button>
          </form>
          <Formik
            initialValues={initialValues}
            validationSchema={userAddressSchema}
            onSubmit={(values, { resetForm }) => {
              handleCreateAddress(values, resetForm);
            }}
          >
            <Form>
              <div className="flex justify-center items-center flex-col">
                <label className="text-white text-lg tracking-wide uppercase">
                  Street Address :
                </label>
                <Field
                  type="text"
                  name="address"
                  placeholder="Write your address..."
                  className="w-[80%] rounded-lg bg-[#D9D9D9] mb-2 md:mt-1 py-1 text-center placeholder:text-gray-500"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="flex justify-center items-center flex-col">
                <label className="text-white text-lg tracking-wide uppercase">
                  City :
                </label>
                <Field
                  type="text"
                  name="city"
                  placeholder="Write your city..."
                  className="w-[80%] rounded-lg bg-[#D9D9D9] mb-2 md:mt-1 py-1 text-center placeholder:text-gray-500"
                />
                <ErrorMessage
                  name="city"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="flex justify-center items-center flex-col">
                <label className="text-white text-lg tracking-wide uppercase">
                  State :
                </label>
                <Field
                  type="text"
                  name="state"
                  placeholder="Write your state..."
                  className="w-[80%] rounded-lg bg-[#D9D9D9] mb-2 md:mt-1 py-1 text-center placeholder:text-gray-500"
                />
                <ErrorMessage
                  name="state"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="flex justify-center items-center flex-col">
                <label className="text-white text-lg tracking-wide uppercase">
                  Country :
                </label>
                <Field
                  type="text"
                  name="country"
                  placeholder="Write your country..."
                  className="w-[80%] rounded-lg bg-[#D9D9D9] mb-2 md:mt-1 py-1 text-center placeholder:text-gray-500"
                />
                <ErrorMessage
                  name="country"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="flex justify-center items-center flex-col">
                <label className="text-white text-lg tracking-wide uppercase">
                  Postal Code :
                </label>
                <Field
                  type="text"
                  name="postalCode"
                  placeholder="Write your postal code number..."
                  className="w-[80%] rounded-lg bg-[#D9D9D9] mb-2 md:mt-1 py-1 text-center placeholder:text-gray-500"
                />
                <ErrorMessage
                  name="postalCode"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="flex justify-center items-center flex-col">
                <label className="text-white text-lg tracking-wide uppercase">
                  Phone Number :
                </label>
                <Field
                  type="text"
                  name="phone"
                  placeholder="Write your phone number..."
                  className="w-[80%] rounded-lg bg-[#D9D9D9] mb-2 md:mt-1 py-1 text-center placeholder:text-gray-500"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="flex flex-col justify-center items-center mt-5">
                <button
                  type="submit"
                  className="w-[80%] rounded-full duration-300 bg-beigeCustom text-black mb-2 hover:bg-grayCustom hover:text-beigeCustom font-bold text-2xl py-1 tracking-wider hover:scale-105"
                >
                  {isLoading ? 'Creating Address...' : 'Create Address'}
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </dialog>
    </div>
  );
};

export default CreateAddress;
