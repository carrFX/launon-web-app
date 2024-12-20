'use client';
import React from 'react'
import { RiTimeLine } from "react-icons/ri";

type Props = {
  orderDetail: any,
  orderStatuses: Array<string>
}
const TrackingOrderSide = (props: Props) => {
  const { orderDetail, orderStatuses } = props
  return (
    <div className="drawer-side">
                <label htmlFor="tracking_order_sidebar" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                {/* Sidebar content here */}
                <h1 className="text-center w-full text-lg md:text-xl font-bold overflow-y-scroll pt-28 lg:pt-0 text-black">Tracking Order </h1>
                <ul className="steps steps-vertical ">
                    {orderDetail.status as string == 'recalculate' ? (
                        <React.Fragment>
                            <div className="w-full flex justify-center items-center text-black">
                                <RiTimeLine className="w-8 h-8 mt-7 mb-2 text-center" />
                            </div>
                            <li className="text-center font-medium text-black">Laundry items are being recounted to ensure accuracy. Please wait a moment while we double-check the details.</li>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {orderStatuses
                                .filter(status => status !== 'recalculate')
                                .map((status, index) => (
                                <li
                                    key={status}
                                    className={`step ${orderStatuses.indexOf(orderDetail.status as string) >= index ? 'step-neutral' : ''}`}
                                >
                                    {status.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}
                                </li>
                            ))}
                        </React.Fragment>
                    )
                    }
                </ul>
                </ul>
            </div>
  )
}

export default TrackingOrderSide