import {
  matchedData,
  validationResult,
  ValidationError
} from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import Error from '../interfaces/error.interface';

const validateRules = (
  req: Request,
  res: Response,
  next: NextFunction
): void | Response => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors: Error[] = [];
  errors.array().map((err) => extractedErrors.push({ message: err.msg }));

  return res.status(422).json({
    errors: extractedErrors
  });
};

export default validateRules;
