import { MailController } from '@/controllers/mail.controller';
import { validateMailBody } from '@/middlewares/validator/mailValidator';
import { Router } from 'express';

export class MailRouter {
  private router: Router;
  private mailController : MailController;

  constructor() {
    this.mailController = new MailController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/send-reset-password', validateMailBody, this.mailController.sendMailResetPassword)
    this.router.post('/send-update-mail',validateMailBody, this.mailController.sendMailUpdateEmail)
    this.router.post('/send-only-verify',validateMailBody, this.mailController.sendMailOnlyVerification)
  }

  getRouter(): Router {
    return this.router;
  }
}