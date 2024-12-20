'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import BtnPagination from '../BtnPagination';
import { useState, useEffect } from 'react';
import { Props } from 'next/script';

const OutletList = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = Number(searchParams?.get('page')) || 1;
  const [allAddress, setAllAddress] = useState<any[]>([]);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    // Fetch data logic here
  }, [currentPage]);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Define handlePageChange function
  const handlePageChange = (page: number) => {
    router.push(`${process.env.NEXT_PUBLIC_BASE_WEB_URL}/outlets?page=${page}`);
    scrollTop();
  };

  return (
    <div className="w-full flex flex-col justify-start items-center mt-5">
      {/* Render address data */}
      {/* <BtnPagination
        {...({ handlePageChange } as Props)}
        currentPage={currentPage}
        totalPage={totalPage}
        handlePageChange={handlePageChange}
      /> */}
    </div>
  );
};

export default OutletList;
