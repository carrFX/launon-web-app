type AUser = {
    id: number;
    email: string;
    role: string;
}

declare namespace Express {
    export interface Request {
        user?:AUser
    }
}

declare module 'midtrans-client' {
    export class Snap {
      constructor(config: {
        isProduction: boolean;
        serverKey: string;
        clientKey: string;
      });
  
      createTransaction(param: any): Promise<any>;
      transaction: {
        notification(param: any): Promise<any>;
      };
    }
  }