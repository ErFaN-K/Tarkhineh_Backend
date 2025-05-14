import { UpdateUserDTO } from '@/dto/user.dto'
import { Request, Response, NextFunction } from 'express'
import { ObjectSchema } from 'joi'

export const updateUserValidate = (schema: ObjectSchema) => {
  return (
    req: Request<{}, {}, UpdateUserDTO>,
    res: Response,
    next: NextFunction,
  ): void => {
    const { error } = schema.validate(req.body, { abortEarly: false })
    if (error) {
      res.status(400).json({
        statusCode: 400,
        success: false,
        message: 'Validation failed',
        errors: error.details.map((err) => err.message),
      })
      return
    }

    next()
  }
}
