/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from 'jsonwebtoken';
import { File as MulterFile } from 'multer';

declare global {
  namespace Express {
    interface Request {
      file?: MulterFile;
      files?: {
        [fieldname: string]: MulterFile[];
      };
      user?: JwtPayload & {
        userId: string;
        role: 'admin' | 'user';
      };
    }
  }
}
