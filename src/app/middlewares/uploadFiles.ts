/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';

// Path to your uploads folder
const uploadsFolder = path.join(__dirname, '../../uploads/files');

// Ensure the directory exists
if (!fs.existsSync(uploadsFolder)) {
  fs.mkdirSync(uploadsFolder, { recursive: true });
}

// Set storage options for files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsFolder); // Store files in 'uploads/files'
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename based on timestamp
  },
});

// Filter to allow only PDF files
const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'), false);
  }
};

// Multer middleware for multiple PDF uploads
export const uploadFiles = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // Max 10MB
}).array('pdfNotes', 10); // Accept up to 10 PDFs

// ====== Cloudinary Upload for PDFs ======

export const uploadPdfToCloudinary = async (
  filePath: string,
): Promise<string> => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: 'raw',
      type: 'upload',
      folder: 'pdfNotes',
    });

    return result.secure_url;
  } catch (error) {
    throw new Error('Cloudinary PDF upload failed: ' + error);
  }
};
