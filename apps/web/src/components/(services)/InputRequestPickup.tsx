'use client';
import { getAddresByUserIdFetchDb } from '@/lib/addressLib';
import { useAppSelector } from '@/redux/hooks';
import { IAddressState } from '@/type/state/addressState';
import { inputRequestPickupSchema } from '@/yup/servicesSchema';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { requestOrderFetchDb } from '@/lib/orderLib';
import { toast } from 'react-toastify';
import { AiOutlineWarning } from 'react-icons/ai';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ICustomerAddress } from '@/type/customerType';

const InputRequestPickup = () => {
  const user = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<IAddressState[]>([]);
  const [allAddress, setAllAddress] = useState<IAddressState[]>([]);
  const AllAddressModal = document.getElementById('modal_another_address') as HTMLDialogElement;
  const router = useRouter();
  const getUserAddress = useCallback(async () => {
    try {
      const { result, ok } = await getAddresByUserIdFetchDb(user.id);
      if (!ok) throw new Error(result.message);
      const availableAddress = result.data.filter((item: ICustomerAddress) => item.isDeleted === false)
      setAllAddress([...availableAddress]);
      const isMain = result.data.filter((address: any) => address.isMain == true);
      setSelectedAddress(isMain);
    } catch (error) {
      console.log(error);
    }
  },[user.id]);
  const handleRequestPickup = async (values: any, resetForm: any) => {
    setIsLoading(true);
    try {
      const { result, ok } = await requestOrderFetchDb({userId: user.id, addressId: selectedAddress[0].id, ...values})
      if (!ok) throw new Error(result.message);
      toast.success(result.message);
      resetForm();
      const modal = document.getElementById("modal_pickup_request") as HTMLDialogElement;
      modal?.close();
      router.push(`/user/orders/${result.orderId}`);
    } catch (error) {
      toast.error(`${error as Error}`);
    }
    setIsLoading(false);
  };
  const beforeSelectAddress = (address: any) => {
    setSelectedAddress([address]) 
    AllAddressModal?.close()
  }
  useEffect(() => {
    getUserAddress();
  }, [getUserAddress]);
  const initialValues = {
    pickupSchedule: '',
  }
  return (
    <dialog id="modal_pickup_request" className="modal">
      <div className="modal-box w-11/12 max-w-3xl bg-[#0000006b]">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white font-extrabold hover:text-beigeCustom">
            ✕
          </button>
        </form>
        {selectedAddress.length > 0 ? (
          <Formik
          initialValues={initialValues}
          validationSchema={inputRequestPickupSchema}
          onSubmit={(values, { resetForm }) => {
            handleRequestPickup(values, resetForm);
          }}
        >
          <Form>
            <div className="flex justify-center items-center flex-col">
              <label
                htmlFor="addressId"
                className="text-white text-lg tracking-wide uppercase"
              >
                Street Address :
              </label>

                <div
                  className="bg-beigeCustom w-[80%] rounded-lg my-2 py-4 px-7 cursor-pointer hover:scale-95 duration-300"
                  onClick={() => AllAddressModal?.showModal()}
                >
                  <div className="flex flex-col justify-center items-center">
                    <h2 className="text-center font-bold text-lg my-2">
                      {selectedAddress[0].city}
                    </h2>
                    <p className="font-medium text-center">{`${selectedAddress[0].address}, ${selectedAddress[0].city}, ${selectedAddress[0].state}, ${selectedAddress[0].country}, ${selectedAddress[0].postalCode}, ${selectedAddress[0].phone}`}</p>
                  </div>
                </div>
            </div>

            <div className="flex justify-center items-center flex-col">
              <label
                htmlFor="pickupSchedule"
                className="text-white text-lg tracking-wide uppercase"
              >
                Pickup Schedule :
              </label>
              <Field
                type="datetime-local"
                name="pickupSchedule"
                id="pickupSchedule"
                className="w-[80%] px-14 cursor-pointer rounded-lg bg-[#D9D9D9] mb-2 md:mt-1 py-1 text-center placeholder:text-gray-500"
              />
              <ErrorMessage
                name="pickupSchedule"
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
                {isLoading ? 'Proccessing..':'Request Pickup'}
              </button>
            </div>
          </Form>
        </Formik>
        ) : (
          <div className='w-full text-center flex flex-col justify-center items-center'>
            <AiOutlineWarning className="text-beigeCustom w-10 h-10"/>
            <h1 className='text-2xl font-semibold text-white'>Please Create Your Address First On The Profile Page...</h1>
            <Link href={`/user/profile/${user.id}`} className="text-beigeCustom font-semibold hover:text-white duration-300 my-2">Go To Profile</Link>
          </div>
        )}
        {/*Another Address*/}
        <dialog id="modal_another_address" className="modal">
          <div className="modal-box w-11/12 max-w-3xl bg-[#0000006b]">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white font-extrabold hover:text-beigeCustom">
                ✕
              </button>
            </form>
            <div className="w-full flex flex-col justify-center items-center">
              {allAddress.map((address: any) => (
                <div key={address.id} onClick={() => beforeSelectAddress(address)} className="bg-beigeCustom w-[80%] rounded-lg my-2 py-4 px-7 cursor-pointer hover:scale-95 duration-300">
                  <div className="flex flex-col justify-center items-center">
                    <h2 className="text-center font-bold text-lg my-2">
                      {address.city}
                    </h2>
                    <p className="font-medium text-center">{`${address.address}, ${address.city}, ${address.state}, ${address.country}, ${address.postalCode}, ${address.phone}`}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </dialog>

      </div>
    </dialog>
  );
};

export default InputRequestPickup;
