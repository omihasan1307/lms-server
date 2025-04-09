import { v2 as cloudinary } from 'cloudinary';
import config from '../config';

cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.api_key,
  api_secret: config.api_secret,
});

interface CloudinaryResult {
  secure_url: string;
  public_id: string;
}

export const uploadToCloudinary = async (
  filePath: string,
): Promise<CloudinaryResult> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      filePath,
      { folder: 'courses/thumbnails' },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result as CloudinaryResult);
        }
      },
    );
  });
};
