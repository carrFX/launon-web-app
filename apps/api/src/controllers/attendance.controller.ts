import { Request, Response } from 'express';
import prisma from '@/prisma';

export class AttendanceController {
  // async getAllAttendance(req: Request, res: Response) {
  //   try {
  //     const attendanceRecords = await prisma.attendance.findMany();
  //     return res.status(200).send(attendanceRecords);
  //   } catch (error) {
  //     return res.status(500).send({ error: 'Error fetching attendance records' });
  //   }
  // }

  // async getAttendanceById(req: Request, res: Response) {
  //   const { id } = req.params;

  //   try {
  //     const attendance = await prisma.attendance.findUnique({
  //       where: { id: Number(id) },
  //     });

  //     if (!attendance) {
  //       return res.status(404).send({ error: 'Attendance not found' });
  //     }

  //     return res.status(200).send(attendance);
  //   } catch (error) {
  //     return res.status(500).send({ error: 'Error fetching attendance record' });
  //   }
  // }

  // async getAttendanceByDate(req: Request, res: Response) {
  //   const { workerId, date } = req.query;

  //   try {
  //     const parsedWorkerId = parseInt(workerId as string, 10);
  //     const parsedDate = new Date(date as string);

  //     const attendanceRecord = await prisma.attendance.findFirst({
  //       where: {
  //         workerId: parsedWorkerId,
  //         date: parsedDate,
  //       },
  //     });

  //     if (!attendanceRecord) {
  //       return res.status(404).send({ error: 'Attendance record not found for the specified worker and date' });
  //     }

  //     return res.status(200).send(attendanceRecord);
  //   } catch (error) {
  //     console.error('Error fetching attendance by worker and date:', error);
  //     return res.status(500).send({ error: 'Error fetching attendance record' });
  //   }
  // }

  // async createAttendance(req: Request, res: Response) {
  //   const { workerId, date, checkIn } = req.body;

  //   try {
  //     const newAttendance = await prisma.attendance.create({
  //       data: {
  //         workerId,
  //         date: new Date(date), 
  //         checkIn: new Date(checkIn), 
  //       },
  //     });

  //     return res.status(201).send(newAttendance);
  //   } catch (error:any) {
  //     if (error.code === 'P2002') {
  //       return res.status(400).send({ error: 'Attendance already exists for this worker on this date' });
  //     }
  //     return res.status(500).send({ error: 'Error creating attendance record' });
  //   }
  // }

  // async updateAttendance(req: Request, res: Response) { //checkout
  //   const { id } = req.params;
  //   const { checkOut } = req.body;

  //   try {
  //     const updatedAttendance = await prisma.attendance.update({
  //       where: { id: Number(id) },
  //       data: { checkOut: new Date(checkOut) }, 
  //     });

  //     return res.status(200).send(updatedAttendance);
  //   } catch (error:any) {
  //     if (error.code === 'P2025') {
  //       return res.status(404).send({ error: 'Attendance record not found' });
  //     }
  //     return res.status(500).send({ error: 'Error updating attendance record' });
  //   }
  // }

  // async getAttendanceLogByWorker(req: Request, res: Response) {
  //   const  workerId  = +req.params.id;

  //   try {
  //     const attendanceLog = await prisma.attendance.findMany({
  //       where: { workerId: Number(workerId) },
  //       orderBy: { date: 'desc' },
  //     });

  //     return res.status(200).send(attendanceLog);
  //   } catch (error) {
  //     return res.status(500).send({ error: 'Error fetching attendance log' });
  //   }
  // }
}
