import express, {
  json,
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
  Router,
} from 'express';
import cors from 'cors';
import '@/helpers/cron/customerCron';
import { PORT } from './config';
import cookieParser from 'cookie-parser';
import { AttendanceRouter } from './routers/attendence.router';
import { AddressRouter } from './routers/address.router ';
import { OutletRouter } from './routers/outlet.router';
import { OrderRouter } from './routers/order.router';
import { SuperAdminRouter } from './routers/superAdmin.router';
import { NotificationRouter } from './routers/notification.router';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
import { AuthRouter } from './routers/auth.router';
import { GoogleRouter } from './routers/google.router';
import { UserRouter } from './routers/user.router';
import { MailRouter } from './routers/mail.router';
import { OutletWorkerRouter } from './routers/outletWorker.router';
import { PickupDeliveryRequestRouter } from './routers/pdrd.router';
import { OrderItemRouter } from './routers/orderItem.router';
import { WorkerJobHistoryRouter } from './routers/workHistory.router';
import { PaymentRouter } from './routers/payment.router';

export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(cookieParser());
    this.app.use(
      cors({
        origin: ['http://localhost:3000', 'http://localhost:8000'],
        methods: 'GET,POST,PUT,PATCH,DELETE',
        credentials: true,
      }),
    );
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use('/api/public',express.static(path.join(__dirname, '../public')));
  }

  private handleError(): void {
    // not found
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes('/api/')) {
        res.status(404).send('Not found !');
      } else {
        next();
      }
    });

    // error
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (req.path.includes('/api/')) {
          console.error('Error : ', err.stack);
          res.status(500).send('Error !');
        } else {
          next();
        }
      },
    );
  }

  private routes(): void {
    const paymentRouter = new PaymentRouter();
    const googleRouter = new GoogleRouter();
    const mailRouter = new MailRouter();
    const authRouter = new AuthRouter();
    const userRouter = new UserRouter();
    const attendanceRouter = new AttendanceRouter();
    const addressRouter = new AddressRouter();
    const outletRouter = new OutletRouter();

    const orderRouter = new OrderRouter();
    const superAdminRouter = new SuperAdminRouter();
    const notificationRouter = new NotificationRouter();
    const outletWorkerRouter = new OutletWorkerRouter();
    const pickupDeliveryRequestRouter = new PickupDeliveryRequestRouter();
    const orderItemRouter = new OrderItemRouter();
    const workHistoryRouter = new WorkerJobHistoryRouter();

    this.app.get('/api', (req: Request, res: Response) => {
      res.send(`Hello, Purwadhika Student API!`);
    });

    this.app.use('/api/payment', paymentRouter.getRouter());
    this.app.use('/api/google', googleRouter.getRouter());
    this.app.use('/api/mail', mailRouter.getRouter());
    this.app.use('/api/auth', authRouter.getRouter());
    this.app.use('/api/users', userRouter.getRouter());
    this.app.use('/api/address', addressRouter.getRouter());
    this.app.use('/api/attendence', attendanceRouter.getRouter());
    this.app.use('/api/order', orderRouter.getRouter());
    this.app.use('/api/outlet', outletRouter.getRouter());
    this.app.use('/api/outlet-workers', outletWorkerRouter.getRouter());
    this.app.use('/api/super-admin', superAdminRouter.getRouter());
    this.app.use('/api/notification', notificationRouter.getRouter());
    this.app.use('/api/worker', outletWorkerRouter.getRouter());
    this.app.use('/api/pdr', pickupDeliveryRequestRouter.getRouter());
    this.app.use('/api/order-item', orderItemRouter.getRouter());
    this.app.use('/api/work-history', workHistoryRouter.getRouter());
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/api`);
    });
  }
}
