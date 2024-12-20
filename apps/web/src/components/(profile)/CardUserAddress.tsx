import { IoMdCall } from 'react-icons/io';
import BtnDeleteAddress from './BtnDeleteAddress';
import BtnEditAddress from './BtnEditAddress';
import BtnPinAddress from './BtnPinAddress';
type CardAddressProps = {
  city: string;
  address: string;
  phone: string;
  isMain: boolean;
  addressId: number;
};

const CardUserAddress: React.FC<CardAddressProps> = (props) => {
  const { city, address, phone, isMain, addressId } = { ...props };
  return (
    <div className={`card bg-gray-300 w-96 shadow-xl`}>
      <div className={`card-body h-56`}>
        <div className="flex justify-between items-center">
          <h2 className="card-title">{city}</h2>
          {isMain ? (
            <h2 className="card-title text-grayCustom font-semibold uppercase text-sm tracking-wider border border-beigeCustom px-3 py-1 rounded-full">
              Main
            </h2>
          ) : (
            <BtnPinAddress addressId={addressId} />
          )}
        </div>
        <div className="w-full h-16">
          <p className="font-medium line-clamp-2">{address}</p>
        </div>
        <p className="font-medium flex justify-start items-center gap-1">
          <IoMdCall />({phone})
        </p>
        <div className="w-full flex justify-center gap-2 items-center">
          <BtnEditAddress addressId={addressId} />
          {isMain == false && <BtnDeleteAddress addressId={addressId} />}
        </div>
      </div>
    </div>
  );
};

export default CardUserAddress;
