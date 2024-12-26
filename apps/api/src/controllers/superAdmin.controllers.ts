import { Request, Response } from 'express';
import prisma from '@/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export class SuperAdminController {
    async loginSuperAdmin(req: Request, res: Response): Promise<Response> {
        const { mail, password } = req.body;
    
        try {
          const admin = await prisma.user.findUnique({
            where: { mail },
          });
    
          if (!admin) {
            return res.status(401).send({ error: 'Invalid email or password' });
          }
    
          if(admin.password === null) throw new Error('Password not set');
          const passwordMatch = await bcrypt.compare(password, admin.password);
    
          if (!passwordMatch) {
            return res.status(401).send({ error: 'Invalid email or password' });
          }
    
          const token = jwt.sign(
            { id: admin.id, email: admin.mail, role: 'super_admin' },
            process.env.JWT_SECRET || 'sangat rahasia',
            {
              expiresIn: '7d',
            },
          );
    
          return res.status(200).send({
            token: token,
            outletEmail: admin.mail,
          });
        } catch (error) {
          console.error('Error during login:', error);
          return res.status(500).send({ error: 'Error during login' });
        }
      }
}