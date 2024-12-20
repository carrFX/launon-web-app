'use client';
import {  formatTime } from '@/lib/dateTime';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { IoIosLogOut } from "react-icons/io";
import { IoIosLogIn } from "react-icons/io";
import { Attendance } from '@/type/worker/workerType';
import { FaCheckCircle } from "react-icons/fa";



interface AttendanceTodayProps {
    onclick: () => void; 
}

export default function AttendanceToday({ onclick }: AttendanceTodayProps) {
    const [attendance, setAttendance] = useState<Attendance | null>(null);
    const [error, setError] = useState<string>('');
    const [showCheckInButton, setShowCheckInButton] = useState<boolean>(false);
    const [today, setToday] = useState<string>();
    const [workerId, setWorkerId] = useState<any | null>(null) 
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000'
    useEffect(() => {
        const outletWorker = JSON.parse(localStorage.getItem('outletWorker') || '{}');
        const workerId = outletWorker.id;
        setWorkerId(workerId)
        

        const today = new Date().toISOString().split('T')[0];
        setToday(today);

        const fetchAttendance = async () => {
            try {
                const response = await fetch(`${backendUrl}/api/attendence/date?workerId=${workerId}&date=${today}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    if (errorData.error === "Attendance record not found for the specified worker and date") {
                        setShowCheckInButton(true);
                    } else {
                        setError(errorData.error || 'Failed to fetch attendance');
                    }
                } else {
                    const data: Attendance = await response.json();
                    setAttendance(data);
                    setShowCheckInButton(false);
                }
            } catch (err) {
                setError((err as Error).message);
            }
        };

        if (workerId) {
            fetchAttendance();
        } else {
            setError('Worker ID not found in localStorage');
        }
    }, []);

    const handleCheckIn = async () => {
        const outletWorker = JSON.parse(localStorage.getItem('outletWorker') || '{}');
        const workerId = outletWorker.id;
        const today = new Date().toISOString().split('T')[0];

        try {
            const response = await fetch(`${backendUrl}/api/attendence`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    workerId,
                    date: today,
                    checkIn: new Date().toISOString(),
                }),
            });

            if (response.ok) {
                const data: Attendance = await response.json();
                setAttendance(data);
                setShowCheckInButton(false);
                window.location.reload();
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Failed to check in');
            }
        } catch (err) {
            setError((err as Error).message);
        }
    };

    const handleCheckOut = async () => {
        const attendenceId = attendance?.id;

        try {
            const response = await fetch(`${backendUrl}/api/attendence/id/${attendenceId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    checkOut: new Date().toISOString()
                }),
            });

            if (response.ok) {
                const data: Attendance = await response.json();
                setAttendance(data);
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Failed to check out');
            }
        } catch (err) {
            setError((err as Error).message);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-beigeCustom w-96 p-6 rounded-md shadow-lg relative">
                <button
                    onClick={onclick} // Memanggil fungsi onClick yang diterima sebagai prop
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 z-10"
                >
                    &times;
                </button>
                <p className="text-lg font-bold text-center mb-4 border-b border-b-black">Date: {today}</p>
                {error && <p className="text-red-500 text-center">{error}</p>}
                {attendance && (
                    <div className="">
                        <div className='flex items-center justify-center gap-2'>
                            <IoIosLogIn /><p><b className="text-blue-700">Check In</b>: {formatTime(attendance.checkIn)}</p>
                        </div>
                        <div className='flex items-center justify-center gap-2'>
                            <IoIosLogOut /><p><b className="text-red-700">Check Out</b>: {formatTime(attendance.checkOut)}</p>
                        </div>
                        {attendance.checkIn && attendance.checkOut ? (
                            <p className="mt-4 font-bold text-center flex items-center gap-2 justify-center">Your shift is complete <FaCheckCircle /></p>
                        ) : (
                            <button
                                className="px-4 py-2 mt-4 w-full text-white bg-red-500 rounded hover:bg-red-600"
                                onClick={handleCheckOut}
                            >
                                Check Out
                            </button>
                        )}
                    </div>
                )}
                {showCheckInButton && (
                    <button
                        onClick={handleCheckIn}
                        className="px-4 py-2 mt-4 w-full text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                        Check In
                    </button>
                )}
                <Link
                    href={`/worker/attendenceHistory/${workerId}`}
                    className="block mt-4 text-blue-500 hover:underline text-center"
                >
                    My Attendance History
                </Link>
            </div>
        </div>
    );
}
