import axios from "axios";
import dotenv from 'dotenv';
dotenv.config();
const geocodeApiUrl = `https://api.opencagedata.com/geocode/v1/json`;

export const existingGeocodeResponse = async (street: string, city: string, state: string, country: string, postalCode: string) => {
    return await axios.get(geocodeApiUrl, {
        params: {
          q: `${street}, ${city}, ${state}, ${country}, ${postalCode}`,
          key: process.env.OPENCAGE_API_KEY,
          language: 'en',
        },
      });
}