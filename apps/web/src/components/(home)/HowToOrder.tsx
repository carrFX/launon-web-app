import { MdManageAccounts } from 'react-icons/md';
import { TbHandClick, TbWashEco } from "react-icons/tb";
import { MdOutlineScheduleSend } from "react-icons/md";
import { HiOutlineRefresh } from "react-icons/hi";
import { RiSecurePaymentLine } from "react-icons/ri";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
const HowToOrder = () => {
  return (
    <section className="w-full py-6 flex flex-col justify-center items-center bg-beigeCustom">
      <div className="text-center my-3 md:my-11 px-5 md:px-0">
        <h1 className="text-2xl md:text-5xl font-semibold uppercase tracking-wide text-black mb-0 mt-12 md:mb-3 md:mt-0">
          How To Order At LaunON.
        </h1>
        <p>
          Ikuti langkah mudah berikut untuk memesan layanan laundry di LaunON
          dan nikmati kemudahan mencuci tanpa ribet!
        </p>
      </div>

      <div className="flex flex-col justify-center items-center text-center px-3 md:px-28 mb-10 text-black">
        <MdManageAccounts className="w-12 h-12 md:w-16 md:h-16" />
        <h1 className="text-sm md:text-xl font-bold">
          Create an Account or Login
        </h1>
        <p className="text-sm md:text-lg font-medium">
        Jika Anda pelanggan baru, daftarkan akun Anda dengan mengisi data diri pada halaman &quot;Daftar&quot;. Jika Anda sudah memiliki akun, masuk ke aplikasi dengan menggunakan kredensial yang telah Anda buat sebelumnya.
        </p>
      </div>

      <div className="flex flex-col justify-center items-center text-center px-3 md:px-28 mb-10 text-black">
        <MdOutlineScheduleSend className="w-12 h-12 md:w-16 md:h-16" />
        <h1 className="text-lg md:text-xl font-bold">
          Request a Laundry Pickup
        </h1>
        <p className="text-sm md:text-lg font-medium">
        Pilih opsi &quot;Permintaan Penjemputan&quot; dan isi informasi yang diperlukan seperti tanggal, waktu penjemputan, dan alamat. Lokasi Anda akan otomatis terdeteksi, tetapi Anda juga dapat menyesuaikannya jika diperlukan. Setelah semua data diisi, kirim permintaan penjemputan Anda.
        </p>
      </div>

      <div className="flex flex-col justify-center items-center text-center px-3 md:px-28 mb-10 text-black">
        <HiOutlineRefresh className="w-12 h-12 md:w-16 md:h-16" />
        <h1 className="text-lg md:text-xl font-bold">
        Wait for Driver Assignment
        </h1>
        <p className="text-sm md:text-lg font-medium">
        Setelah mengirim permintaan, sistem akan secara otomatis meneruskan pesanan Anda ke outlet terdekat. Seorang driver akan diberitahu untuk menjemput laundry Anda, dan Anda dapat melacak status penjemputan melalui aplikasi.
        </p>
      </div>

      <div className="flex flex-col justify-center items-center text-center px-3 md:px-28 mb-10 text-black">
        <TbWashEco className="w-12 h-12 md:w-16 md:h-16" style={{color: 'black'}} />
        <h1 className="text-lg md:text-xl font-bold">
        Laundry Processing at the Outlet
        </h1>
        <p className="text-sm md:text-lg font-medium">
        Setelah laundry tiba di outlet, admin akan mencatat total berat dan jumlah item pakaian. Laundry Anda akan melalui tiga tahap pemrosesan: pencucian, penyetrikaan, dan pengemasan. Anda dapat melacak setiap tahapan ini melalui aplikasi secara real-time.
        </p>
      </div>

      <div className="flex flex-col justify-center items-center text-center px-3 md:px-28 mb-10 text-black">
        <RiSecurePaymentLine className="w-12 h-12 md:w-16 md:h-16" />
        <h1 className="text-lg md:text-xl font-bold">
        Payment and Delivery
        </h1>
        <p className="text-sm md:text-lg font-medium">
        Setelah proses laundry selesai, Anda akan menerima tagihan. Lakukan pembayaran melalui aplikasi dengan metode yang tersedia. Setelah pembayaran berhasil, driver akan ditugaskan untuk mengantarkan laundry Anda kembali ke alamat yang telah Anda tentukan. Anda bisa melacak proses pengiriman hingga pesanan tiba.
        </p>
      </div>

      <div className="flex flex-col justify-center items-center text-center px-3 md:px-28 mb-10 text-black">
        <IoCheckmarkDoneSharp className="w-12 h-12 md:w-16 md:h-16" />
        <h1 className="text-lg md:text-xl font-bold">
        Order Completion and Feedback
        </h1>
        <p className="text-sm md:text-lg font-medium">
        Setelah laundry Anda diterima, status pesanan akan diperbarui menjadi &quot;Laundry Telah Diterima Customer&quot;. Jika ada masalah seperti kerusakan atau kehilangan barang, Anda dapat mengajukan keluhan melalui aplikasi. Tim LaunON akan segera menindaklanjuti keluhan Anda.
        </p>
      </div>
    </section>
  );
};

export default HowToOrder;
