import { AttendanceController } from '@/controllers/attendance.controller';

import { Router } from 'express';

export class AttendanceRouter {
  private router: Router;
  private attendeceController: AttendanceController;

  constructor() {
    this.attendeceController = new AttendanceController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.attendeceController.getAllAttendance);
    this.router.get('/date', this.attendeceController.getAttendanceByDate);
    this.router.get('/id/:id', this.attendeceController.getAttendanceById);
    this.router.post('/', this.attendeceController.createAttendance);
    this.router.patch('/id/:id',this.attendeceController.updateAttendance);
    this.router.get('/worker/:id', this.attendeceController.getAttendanceLogByWorker);
  }

  getRouter(): Router {
    return this.router;
  }
}
