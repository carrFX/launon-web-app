'use client';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { AttendanceRecord, Worker } from "@/type/worker/workerType";
import Link from "next/link";

export default function AttendenceHistory() {
  const [attendanceHistory, setAttendanceHistory] = useState<AttendanceRecord[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<AttendanceRecord[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const { id } = useParams();
  const backendUrl = process.env.BACKEND_URL || "http://localhost:8000";
  const [workerDetail, setWorkerDetail] = useState<Worker | null>()

  useEffect(() => {
    const fetchAttendanceHistory = async () => {
      try {
        if (id) {
          const response = await axios.get(`${backendUrl}/api/attendence/worker/${id}`);
          const sortedData = response.data.sort((a: AttendanceRecord, b: AttendanceRecord) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB.getTime() - dateA.getTime(); 
          });
          setAttendanceHistory(sortedData);
          setFilteredHistory(sortedData);
        }
      } catch (error) {
        console.error("Error fetching attendance history:", error);
      }
    };
    const fetchWorkerDetail = async () => {
      try {
        if (id) {
          const response = await axios.get(`${backendUrl}/api/worker/id/${id}`);
          setWorkerDetail(response.data)
        }
      } catch (error) {
        console.error("Error worker Detail:", error);
      }
    };

    fetchAttendanceHistory();
    fetchWorkerDetail();
  }, []);

  useEffect(() => {
    const filterHistory = () => {
      const filtered = attendanceHistory.filter((record) => {
        const recordDate = new Date(record.date);
        return (
          recordDate.getMonth() + 1 === selectedMonth &&
          recordDate.getFullYear() === selectedYear
        );
      });
      setFilteredHistory(filtered);
    };

    filterHistory();
  }, [selectedMonth, selectedYear, attendanceHistory]);

  return (
    <div className="bg-white min-h-[70vh]">
      <div className="bg-grayCustom text-beigeCustom flex justify-end items-center p-4">
        <Link href={`/worker/dashboard`} className="hover:underline">
          My Dashboard
        </Link>
      </div>
      <h1 className="text-center font-bold text-xl mt-4">{workerDetail?.name.toUpperCase()}&apos;s ATTENDANCE</h1>
        <div className="mt-4 mb-2 ml-4">
            <div className="flex gap-4 ">
                <div>
                <label htmlFor="month" className="block font-medium">Month</label>
                <select
                    id="month"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(Number(e.target.value))}
                    className="border px-2 py-1 bg-white"
                >
                    {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                        {new Date(0, i).toLocaleString("default", { month: "long" })}
                    </option>
                    ))}
                </select>
                </div>

                <div>
                <label htmlFor="year" className="block font-medium">Year</label>
                <select
                    id="year"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                    className="border px-2 py-1 bg-white"
                >
                    {Array.from({ length: 10 }, (_, i) => (
                    <option key={i} value={new Date().getFullYear() - i}>
                        {new Date().getFullYear() - i}
                    </option>
                    ))}
                </select>
                </div>
            </div>
        </div>

      {filteredHistory.length === 0 ? (
        <p className="text-center">No records found for the selected month and year.</p>
      ) : (
        <div className="p-4">
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                <th className="p-2 border-2 bg-beigeCustom">No.</th>
                <th className="p-2 border-2 bg-beigeCustom">Date</th>
                <th className="p-2 border-2 bg-beigeCustom">Check-In</th>
                <th className="p-2 border-2 bg-beigeCustom">Check-Out</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.map((record, i) => (
                <tr key={record.id}>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }} className="text-center">
                    {i + 1}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }} className="text-center">
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }} className="text-center">
                    {new Date(record.checkIn).toLocaleTimeString()}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }} className="text-center">
                    {record.checkOut ? new Date(record.checkOut).toLocaleTimeString() : "Not Checked Out"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
