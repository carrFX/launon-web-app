'use client';
import serviceImg from "@/data/dummy.json";
import InputRequestPickup from "./InputRequestPickup";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";

const PickupRequest = () => {
  const user = useAppSelector((state) => state.auth);
  const router = useRouter();
  const handleOrder = () => {
    if(user.isLogin == false) return router.push('/auth/login?redirect=/services');
    if(user.verified == false) {
      return toast.error('Please verify your email first on profile page!');
    }
    const modal = document.getElementById("modal_pickup_request") as HTMLDialogElement;
    return modal?.showModal();
  }
  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-center my-5">
      <div className="card w-11/12 md:w-4/5 lg:w-3/4 shadow-xl bg-lightCustom">
        <div className="flex justify-center items-center rounded-t-2xl overflow-hidden shadow-md">
          <Image
            width={500}
            height={500}
            className="w-full h-auto max-h-48 md:max-h-60 lg:max-h-96 object-cover object-center"
            src={serviceImg.services.image}
            alt={serviceImg.services.alt}
          />
        </div>
        <div className="card-body text-center">
          <h2 className="font-bold text-lg md:text-2xl text-center w-full">Wash, Iron and Deliver to the Door!</h2>
          <p className="text-black text-medium md:text-lg">Transformasikan pengalaman laundry Anda dengan <b>layanan Cuci, Setrika, dan Antar ke Pintu dari kami!</b> Lelah menghabiskan waktu untuk mencuci dan menyetrika? Biarkan tim profesional kami merawat pakaian Anda dengan kualitas terbaik. Pesan dari rumah dan nikmati layanan antar ke pintu untuk kenyamanan maksimal. Dengan harga <b>hanya 30.000 IDR per kilo</b>, Anda mendapatkan layanan premium yang hemat. Jangan lewatkan kesempatan ini! Pesan sekarang dan nikmati pakaian bersih yang siap dipakai tanpa repot. Jadikan waktu Anda lebih berharga dengan layanan laundry praktis kami!</p>
          <div className="w-full flex justify-center items-center gap-3">
            <div onClick={() => handleOrder()} className="cursor-pointer hover:bg-black hover:text-beigeCustom bg-beigeCustom text-black py-2 px-4 rounded-full transition duration-200 shadow-xl shadow-[#00000048] text-base uppercase tracking-wide">Order Now</div>
          </div>
          <InputRequestPickup/>
        </div>
      </div>
    </div>
  );
};

export default PickupRequest;
