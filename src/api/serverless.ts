import { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../app';
import mongoose from 'mongoose';
import config from '../app/config';

let isDBConnected = false;

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    // Connect DB if not already connected
    if (!isDBConnected) {
      await mongoose.connect(config.database_url as string);
      isDBConnected = true;
      console.log('Database connected successfully');
    }
    
    // Convert Vercel request to Express
    return app(req, res);
  } catch (err) {
    console.error('Connection error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
};