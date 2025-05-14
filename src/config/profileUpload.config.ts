import path from 'path'
import fs from 'fs'
import multer, { StorageEngine, FileFilterCallback } from 'multer'
import { Request, Response, NextFunction } from 'express'

const uploadDir = path.join(process.cwd(), 'public/uploads/profiles')

if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })

const storage: StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const uniqueName = `user-profile_${Date.now()}${path.extname(file.originalname)}`
    cb(null, uniqueName)
  },
})

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    cb(new Error('Only image files are allowed!'))
  }
}

const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },
  fileFilter,
}).single('userProfile')

const profileUpload = (req: Request, res: Response, next: NextFunction) => {
  upload(req, res, (err: any) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        success: false,
        message: 'File upload error',
        error: err.message,
      })
    }

    if (err) {
      return res.status(400).json({
        success: false,
        message: 'File validation error',
        error: err.message,
      })
    }

    next()
  })
}

export default profileUpload
