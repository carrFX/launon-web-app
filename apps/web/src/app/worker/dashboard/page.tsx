"use client"; 
import LogoutWorker from '@/components/(auth)/LogoutWorker';
import AttendanceToday from '@/components/(worker)/attendenceToday';
import DriverServices from '@/components/(worker)/driverServices';
import IronerDashboard from '@/components/(worker)/ironerDashboard';
import PackerDashboard from '@/components/(worker)/packerDashboard';
import WasherDashboard from '@/components/(worker)/washerDashboard';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Attendance } from '@/type/worker/workerType';

interface WorkerDetail {
    id: number;
    name: string;
    role: string;
    email: string;
}

export default function DashboardWorker() {
    const [role, setRole] = useState<string | null>(null);
    const [workerDetail, setWorkerDetail] = useState<WorkerDetail | null>(null);
    const [showAttendance, setShowAttendance] = useState<boolean>(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [attendance, setAttendance] = useState<Attendance | null>(null);
    const router = useRouter();
    const today = new Date().toISOString().split('T')[0];
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000'

    useEffect(() => {
        const data = localStorage.getItem('outletWorker');
        if (data) {
            const workerData = JSON.parse(data);
            setRole(workerData.role);
            setWorkerDetail(workerData);
            fetchAttendance(workerData.id);
        } else {
            router.push('/worker/login');
        }
    }, []);

    const fetchAttendance = async (workerId: number) => {
        try {
            const response = await fetch(
                `${backendUrl}/api/attendence/date?workerId=${workerId}&date=${today}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (response.ok) {
                const data = await response.json();
                setAttendance(data || null);
            } else {
                setAttendance(null); // Jika respons kosong atau error
            }
        } catch (err: any) {
            console.error('Error fetching attendance:', err);
            setAttendance(null); // Pastikan nilai null saat error
        }
    };

    const toggleAttendance = () => {
        setShowAttendance((prev) => !prev);
    };

    return (
        <div className="bg-white min-h-screen">
            <div className="bg-grayCustom text-beigeCustom flex justify-between items-center p-4">
                <LogoutWorker />
                <nav className="relative">
                    {/* Dropdown Trigger */}
                    <button
                        onClick={() => setIsDropdownOpen((prev) => !prev)}
                        className="md:hidden bg-slate-700 p-2 rounded text-sm">
                        Menu
                    </button>
                    
                    {/* Navigation Menu */}
                    <div
                        className={`${
                            isDropdownOpen ? 'block' : 'hidden'
                        } absolute right-0 top-10 bg-stone-500 text-beigeCustom w-fit shadow-lg rounded z-50 md:hidden`}>
                        <button
                            onClick={toggleAttendance}
                            className="block px-4 py-2 hover:bg-gray-200 w-full text-left">
                            My Attendance
                        </button>
                        <Link
                            href={`/worker/workHistory/${workerDetail?.id}/${role === 'driver' ? 'driver' : 'crew'}`}
                            className="block px-4 py-2 hover:bg-gray-200 w-full text-left">
                            My Work History
                        </Link>
                    </div>

                    {/* Full Screen Menu */}
                    <div className="hidden md:flex space-x-4">
                        <button
                            onClick={toggleAttendance}
                            className="hover:underline">
                            My Attendance
                        </button>
                        <Link
                            href={`/worker/workHistory/${workerDetail?.id}/${role === 'driver' ? 'driver' : 'crew'}`}
                            className="hover:underline">
                            My Work History
                        </Link>
                    </div>
                </nav>
            </div>

            {showAttendance && (
                <div className="p-4 relative bg-gray-200 rounded shadow-lg">
                    <AttendanceToday onclick={toggleAttendance} />
                </div>
            )}

            {/* Kondisi jika tidak ada attendance */}
            {attendance === null && (
                <div className="p-4 text-red-500 text-center static bg-beigeCustom">
                    <strong>You haven&apos;t checked in yet</strong> <br /> consider to checkin first on the attendence menu before doing any tasks
                </div>
            )}

            {/* Dashboard based on role */}
            {role === 'driver' && workerDetail && (
                <DriverServices workerDetail={workerDetail} />
            )}
            {role === 'washer' && workerDetail && (
                <WasherDashboard />
            )}
            {role === 'ironer' && workerDetail && (
                <IronerDashboard />
            )}
            {role === 'packer' && workerDetail && (
                <PackerDashboard />
            )}
        </div>
    );
}
