import { setPrimaryAddressFetchDb } from '@/lib/addressLib';
import { IPrimaryAddress } from '@/type/customerType';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { TiPinOutline } from "react-icons/ti";
import { toast } from 'react-toastify';

type Props = {
  addressId: number
}
const BtnPinAddress = (props: Props) => {
  const { addressId } = { ...props };
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams().id;
  const userId = Number(params);

  const handleSetPrimaryAddress = async (data: IPrimaryAddress) => {
    setIsLoading(true);
    try {
      const { result, ok } = await setPrimaryAddressFetchDb(data);
      if (!ok) throw result.message;
      toast.success(result.message);
      window.location.reload();
    } catch (error) {
      toast.error(`${error as Error}`);
    }
    setIsLoading(false);
  };
  return (
    <button
      disabled={isLoading}
      onClick={() => handleSetPrimaryAddress({ userId, addressId })}
      className="hover:scale-110 duration-300 rounded-full"
    >
      <TiPinOutline className="w-7 h-7" />
    </button>
  );
};

export default BtnPinAddress;
