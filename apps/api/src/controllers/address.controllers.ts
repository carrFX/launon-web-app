import { Request, Response } from 'express';
import prisma from '@/prisma';
import { Address } from '@prisma/client';
import { existingAddressById, existingAllOutletAddress, existingAllUserAddress, existingOutletAddresses, existingUserAddresses } from '@/services/existing-data/address.exist';
import { existingGeocodeResponse } from '@/helpers/geocode';
import { isDeletedAddress, setMainUserAddress, unMainUserAddressees } from '@/services/update-data/address.update';

export class AddressController {
  async getAllAddresses(req: Request, res: Response): Promise<Response> {
    try {
      const addresses: Address[] = await prisma.address.findMany();
      if (!addresses.length) {
        return res.status(404).send({ error: 'No addresses found' });
      }
      return res.status(200).send(addresses);
    } catch (error) {
      return res.status(500).send({ error: 'Error fetching addresses' });
    }
  }

  async getAllAddressByRole(req: Request, res: Response) {
    const { role } = req.params;
    if (role === 'outlet') {
      try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 6;
        const startIndex = (page - 1) * limit;
        const addresses = await existingAllOutletAddress();
        if (!addresses.length) throw new Error('No addresses found for outlets')
        const paginatedAddress = addresses.slice(
          startIndex,
          startIndex + limit,
        );
        return res.status(200).send({
          status: 'ok',
          message: 'Get all outlet addresses successfully',
          data: paginatedAddress,
          currentPage: page,
          totalPages: Math.ceil(addresses.length / limit),
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : error;
        return res.status(400).send({ status: "error", message: errorMessage });
      }
    } else if (role === 'user') {
      try {
        const addresses = await existingAllUserAddress();
        if (!addresses.length) throw new Error('No addresses found for users');
        return res.status(200).send(addresses);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : error;
        return res.status(400).send({ status: "error", message: errorMessage });
      }
    }
  }

  async getAddressById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const address = await existingAddressById(id)
      if (!address) throw new Error('Address not found')
      return res.status(200).send({
        status: 'ok',
        message: 'Get Address By Id Successfully',
        data: address,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : error;
      res.status(400).send({ status: "error", message: errorMessage });
    }
  }
  async createAddress(req: Request, res: Response) {
    const { phone, street, city, state, country, postalCode, outletId, userId } = req.body;
    try {
      if (!userId && !outletId) throw new Error('Either userId or outletId must be provided')
      const geocodeResponse = await existingGeocodeResponse(street, city, state, country, postalCode);
      if (geocodeResponse.data.length == 0) {
        return res.status(400).send({
          error: 'Address not found.',
          message: geocodeResponse.data,
        });
      }
      const { lat, lng } = geocodeResponse.data.results[0].geometry;
      const latitude = parseFloat(lat);
      const longitude = parseFloat(lng);
      const checkAddress = await existingUserAddresses(userId);
      const isMain = checkAddress.length === 0;

      const newAddress = await prisma.address.create({
        data: {
          userId: userId || null,
          outletId: outletId || null,
          street: street,
          city: city,
          state: state,
          isMain: isMain,
          postalCode: postalCode,
          country: country,
          phone: phone,
          latitude: latitude,
          longitude: longitude,
        },
      });

      return res.status(201).json({ status: 'ok',message: 'Create Address Successfully',data: newAddress });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : error;
      res.status(400).send({ status: "error", message: errorMessage });
    }
  }

  async getAddresByUserId(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const addresses = await existingUserAddresses(id)
      if (!addresses) throw new Error('the user has not created an address')
      return res.status(200).send({ status: 'ok',message: 'Get All Address By User Id Successfully',data: addresses, });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : error;
      res.status(400).send({ status: "error", message: errorMessage });
    }
  }

  async getAddresByOutletId(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const addresses = await existingOutletAddresses(id)
      if (!addresses) throw new Error('The outlet has not created an address')
      return res.status(200).send({ status: 'ok', message: 'Get All Address By Outlet Id Successfully', data: addresses, });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : error;
      res.status(400).send({ status: "error", message: errorMessage });
    }
  }
  // async createAddressReverse(req: Request, res: Response) {
  //   const { userId, outletId, latitude, longitude } = req.body;
  //   try {
  //     if (!userId && !outletId) {
  //       return res
  //         .status(400)
  //         .send({ error: 'Either userId or outletId must be provided' });
  //     }
  //     const apiKey = '671dfa638d605573966053jft24917e';

  //     const reverseGeoResponse = await axios.get(
  //       `https://geocode.maps.co/reverse`,
  //       {
  //         params: { lat: latitude, lon: longitude, api_key: apiKey },
  //       },
  //     );

  //     const data = reverseGeoResponse.data;

  //     if (!data) {
  //       return res.status(404).send({ error: 'Location not found' });
  //     }

  //     const {
  //       display_name,
  //       address: { city_district, city, state, postcode, country },
  //       lat,
  //       lon,
  //     } = data;

  //     const newAddress = await prisma.address.create({
  //       data: {
  //         userId: userId || null,
  //         outletId: outletId || null,
  //         address: display_name,
  //         city: city || city_district,
  //         state: state || '',
  //         postalCode: postcode || '',
  //         country: country || '',
  //         latitude: parseFloat(lat),
  //         longitude: parseFloat(lon),
  //       },
  //     });

  //     return res.status(201).send(newAddress);
  //   } catch (error) {
  //     console.error('Error creating address:', error);
  //     return res.status(500).send({ error: 'Error creating address' });
  //   }
  // }

  async updateAddress(req: Request, res: Response) {
    const { id, street, city, state, postalCode, country, phone } = req.body;
    try {
      const geocodeResponse = await existingGeocodeResponse(street, city, state, country, postalCode)
      if (geocodeResponse.data.length == 0) throw new Error('Address not found.');
      const { lat, lng } = geocodeResponse.data.results[0].geometry;
      const latitude = parseFloat(lat);
      const longitude = parseFloat(lng);

      const updatedAddress = await prisma.address.update({
        where: { id },
        data: {
          street,
          city,
          state,
          postalCode,
          country,
          phone,
          latitude,
          longitude,
        },
      });

      return res.status(200).send(updatedAddress);
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : error;
      res.status(400).send({ status: "error", message: errorMessage });
    }
  }

  async setMainAddress(req: Request, res: Response) {
    const { userId, addressId } = req.body;
    try {
      await unMainUserAddressees(userId)
      const mainAddress = await setMainUserAddress(addressId)
      return res.status(201).json({
        status: 'ok',
        message: 'Set Main Address Successfully',
        data: mainAddress
      });
    } catch (error) {
      const errrorMessage = error instanceof Error ? error.message : error;
      res.status(400).send({ status: "error", message: errrorMessage });
    }
  }

  async deleteAddress(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const deletedAddress = await isDeletedAddress(id)
      if (!deletedAddress) throw new Error('Address not found');
      return res.status(200).send({ status: 'ok', message: 'Delete Address Successfully', data: deletedAddress, });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : error;
      res.status(400).send({ status: "error", message: errorMessage });
    }
  }
}
