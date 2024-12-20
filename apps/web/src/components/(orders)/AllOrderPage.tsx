'use client';
import { FaBoxOpen } from 'react-icons/fa';
import { getOrdersByUserFetchDb, searchOrderFetchDb } from '@/lib/orderLib';
import { useAppSelector } from '@/redux/hooks';
import { IOrder } from '@/type/orderType';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import SearchOrder from './(search-order)/SearchOrder';
import BtnPagination from '@/components/BtnPagination';
import Link from 'next/link';

const AllOrderPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const user = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<IOrder[]>([]);
  const currentPage = Number(searchParams.get('page')) || 1;
  const [totalPage, setTotalPage] = useState(1);
  const selectSearchModal = document.getElementById('modal_search_order') as HTMLDialogElement;
  const byIdModal = document.getElementById('order_by_id') as HTMLDialogElement;
  const byDateModal = document.getElementById('order_by_date') as HTMLDialogElement;

  useEffect(() => {
    const getOrders = async () => {
      try {
        const { result, ok } = await getOrdersByUserFetchDb({
          id: user.id,
          currentPage,
        });
        if (!ok) throw result.message;
        setOrders([...result.data]);
        setTotalPage(result.totalPages);
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, [user.id, currentPage]);
  const handleSearchOrder = async (
    values: { orderId?: string; date?: string },
    resetForm: () => void,
  ) => {
    setIsLoading(true);
    try {
      const { ok, result } = await searchOrderFetchDb(
        values.orderId
          ? { orderId: Number(values.orderId) }
          : { date: values.date },
      );
      if (!ok) throw new Error(result.message);
      setOrders([...result.data]);
      resetForm();
      selectSearchModal.close();
      byIdModal.close();
      byDateModal.close();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full min-h-[100vh] py-6 flex flex-col justify-start items-center">
      <div className="text-center my-3 md:my-11 px-5 md:px-0">
        <h1 className="text-2xl md:text-5xl font-semibold uppercase tracking-wide text-black mb-0 mt-12 md:mb-3 md:mt-0">
          Your Order History
        </h1>
        <p className="text-black text-sm md:text-base mb-2 md:mb-4">
          Lihat perjalanan pesanan Anda dari awal hingga selesai. Tetap
          terhubung dengan setiap langkah dan temukan kemudahan dalam melacak
          riwayat transaksi Anda.
        </p>
      </div>
      {orders.length > 0 ? (
        <>
          <SearchOrder
            handleSubmitSearch={handleSearchOrder}
            isLoading={isLoading}
            selectSearchModal={selectSearchModal}
            byIdModal={byIdModal}
            byDateModal={byDateModal}
          />
          {orders?.map((order) => (
            <div
              key={order.id}
              className={` ${order?.status == 'delivered_to_customer' ? 'border-gray-200' : 'border-grayCustom'} border-2 w-[95%] md:w-[80%] my-2 text-center rounded-box  cursor-pointer duration-300`}
            >
              <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box ">
                <input type="checkbox" />
                <div className="w-full  flex justify-between items-start collapse-title text-base md:text-lg font-bold tracking-wide uppercase">
                  <div className="hidden md:flex flex-col justify-center items-start w-1/3">
                    <p className="text-xs md:text-sm lg:text-base font-extralight">
                      Ordered On
                    </p>
                    <h1 className="text-sm md:text-base lg:text-lg font-light text-start">
                      {new Date(
                        new Date(order?.createdAt as string).getTime() +
                          7 * 60 * 60 * 1000,
                      ).toLocaleString('en-US', {
                        timeZone: 'Asia/Jakarta',
                        dateStyle: 'full',
                      })}
                    </h1>
                  </div>
                  <div className="flex flex-col justify-center items-center w-1/3">
                    <p className="text-xs text-start md:text-center md:text-sm lg:text-base font-extralight">
                      Order Id
                    </p>
                    <h1 className="text-xs md:text-sm lg:text-base font-extralight">
                      #{order?.id}
                    </h1>
                  </div>
                  <div className="flex flex-col justify-center items-end w-1/3 text-end ">
                    <p className="text-xs hidden md:flex md:text-sm lg:text-base font-extralight">
                      Status
                    </p>
                    <h1 className="text-sm md:text-base lg:text-lg font-light">
                      {order?.status.replace(/_/g, ' ')}
                    </h1>
                  </div>
                </div>
                <div className="collapse-content">
                <button onClick={() => {router.push(`/user/orders/${order?.id}`)}} className='cursor-pointer hover:bg-black hover:text-beigeCustom bg-grayCustom text-white py-2 px-4 rounded-full transition duration-200 shadow-xl shadow-[#00000048] text-sm uppercase tracking-wide my-1'>View Detail</button>
                </div>
              </div>
            </div>
          ))}
          <BtnPagination
            currentPage={currentPage}
            totalPage={totalPage}
            handlePageChange={(page) => {
              router.push(
                `${process.env.NEXT_PUBLIC_BASE_WEB_URL}/user/orders?page=${page}`,
              );
              scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </>
      ) : (
        <div className="my-10 w-full flex flex-col justify-center items-center">
          <FaBoxOpen className="text-6xl text-grayCustom" />
          <h1 className="text-center text-md md:text-xl font-semibold text-grayCustom">
            Belum Ada pesanan? Segera coba layanan kami dan rasakan kemudahan
            laundry tanpa repot!
          </h1>
          <button className="mt-2 hover:bg-black hover:text-beigeCustom bg-grayCustom text-black py-2 px-4 rounded-full transition duration-200">
            <Link href={'/services'}>Order Now</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default AllOrderPage;
