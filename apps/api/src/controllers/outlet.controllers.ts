// outlet.controller.ts
import { Request, Response } from 'express';
import prisma from '@/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class OutletController {
  // constructor() {
    // this.getAllOutlet = this.getAllOutlet.bind(this);
    // this.getOutletById = this.getOutletById.bind(this);
    // this.createOutlet = this.createOutlet.bind(this);
    // this.updateOutlet = this.updateOutlet.bind(this);
    // this.deleteOutlet = this.deleteOutlet.bind(this);
    // this.loginOutlet = this.loginOutlet.bind(this);
  // }

  private calculateTotalPages(
    totalItems: number,
    itemsPerPage: number,
  ): number {
    return Math.ceil(totalItems / itemsPerPage);
  }

  // Get all outlets with pagination
  async getAllOutlet(req: Request, res: Response): Promise<Response> {
    try {
      const page = parseInt(req.query.page as string, 10) || 1;
      const pageSize = parseInt(req.query.pageSize as string, 10) || 10;

      const [outlets, totalCount] = await Promise.all([
        prisma.outlet.findMany({
          skip: (page - 1) * pageSize,
          take: pageSize,
        }),
        prisma.outlet.count(),
      ]);

      if (!outlets.length) {
        return res.status(404).json({ error: 'No outlets found' });
      }

      const totalPages = this.calculateTotalPages(totalCount, pageSize);

      return res.status(200).json({
        data: outlets,
        totalPages,
        currentPage: page,
      });
    } catch (error) {
      console.error('Error fetching outlets:', error);
      return res.status(500).json({ error: 'Error fetching outlets' });
    }
  }

  // // Get outlet by ID
  async getOutletById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    try {
      if(!id) throw new Error('Id is required !');
      const outlet = await prisma.outlet.findUnique({ where: { id } });
      if (!outlet) {
        return res.status(404).json({ error: 'Outlet not found' });
      }

      return res.status(200).send(outlet);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : error as string;
      return res.status(500).send({ status: "error", error: errorMessage });
    }
  }

  async createOutlet(req: Request, res: Response) {
    const { name, password, email, lon, lat, address } = req.body;
    const SALT_ROUNDS = 10;

    // if (req.user?.role !== 'super_admin') {
    //   return res.status(403).send(
    //     { error: 'Forbidden: You do not have permission to perform this action',}
    // );
    // }
    try {
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      const newOutlet = await prisma.outlet.create({
        data: {
          outletName: name,
          password: hashedPassword,
          email,
        },
      });

      return res.status(201).json(newOutlet);
    } catch (error: any) {
      if (error.code === 'P2002') {
        return res.status(400).json({ message: 'Email is already in use' });
      }
      console.error('Error creating outlet:', error);
      return res.status(500).json({ message: 'Error creating outlet' });
    }
  }

  // // Update outlet by ID
  async updateOutlet(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, password, email, lon, lat, address } = req.body;
    try {
      const outlet = await prisma.outlet.findUnique({ where: { id } });
      if (!outlet) {
        return res.status(404).json({ error: 'Outlet not found' });
      }

      const updatedData: any = {
        name,
        email,
        // lon: String(lon),
        // lat: String(lat),
        address,
      };

      if (password) {
        updatedData.password = await bcrypt.hash(password, 10);
      }

      const updatedOutlet = await prisma.outlet.update({
        where: { id },
        data: updatedData,
      });

      return res.status(200).json(updatedOutlet);
    } catch (error: any) {
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Outlet not found' });
      }
      console.error('Error updating outlet:', error);
      return res.status(500).json({ error: 'Error updating outlet' });
    }
  }

  // // Delete outlet by ID
  async deleteOutlet(req: Request, res: Response): Promise<Response> {
    const {id} = req.params;
    try {
      await prisma.outlet.delete({ where: { id } });
      return res.status(204).json({ message: 'Outlet has been deleted' });
    } catch (error: any) {
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Outlet not found' });
      }
      console.error('Error deleting outlet:', error);
      return res.status(500).json({ error: 'Error deleting outlet' });
    }
  }

  // // Outlet login
  async loginOutlet(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    try {
      const outlet = await prisma.outlet.findUnique({ where: { email } });
      if (!outlet) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const passwordMatch = await bcrypt.compare(password, outlet.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const token = jwt.sign(
        { id: outlet.id, email: outlet.email, role: 'outlet' },
        process.env.JWT_SECRET || 'sangat_rahasia',
        { expiresIn: '7d' },
      );

      return res.status(200).send({
        token: token,
        outletId: outlet.id,
        outletName: outlet.outletName,
        outletEmail: outlet.email,
        role: 'admin',
      });
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ error: 'Error during login' });
    }
  }
}
