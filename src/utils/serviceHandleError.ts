import { Response } from 'express'
import ResponseHandler from '@/types/ResponseHandler'
import { ValidationError, ValidationErrorItem } from 'sequelize'

const handleError = (error: unknown): ResponseHandler => {
  if (error instanceof ValidationError)
    return {
      success: false,
      statusCode: 400,
      message: 'Validation error',
      errors: error.errors.map((err: ValidationErrorItem) => err.message),
    }

  return {
    success: false,
    statusCode: 500,
    message: error instanceof Error ? error.message : 'Unknown error occurred',
  }
}

export default handleError
