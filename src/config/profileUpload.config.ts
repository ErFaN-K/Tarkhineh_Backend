import path from 'path';
import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';

const profileStorage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ): void => {
    cb(null, './uploads/profiles');
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ): void => {
    const uniqueName =
      'profile-' + Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const profileFileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void => {
  if (file.mimetype === 'image/png') {
    cb(null, true);
    return;
  }
  cb(null, false);
};

export const uploadProfile = multer({
  storage: profileStorage,
  fileFilter: profileFileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});
