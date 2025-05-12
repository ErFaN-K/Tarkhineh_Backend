import { Response } from 'express';

const handleError = (res: Response, error: unknown): void => {
  let message = 'Internal server error';
  let statusCode = 500;

  if (error instanceof Error) {
    message = error.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    data: null,
    errors: error,
  });
};

export default handleError;
