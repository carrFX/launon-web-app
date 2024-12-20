import { NextFunction, Request, Response } from 'express';
import { body, param, ValidationChain, validationResult } from 'express-validator';

const handleValidationErrors = (req: Request,res: Response,next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      status: 'error',
      message: errors.array(),
    });
  }
  next();
};

export const createValidators = (fields: {[key: string]: ValidationChain;}) => {
  return [...Object.values(fields), handleValidationErrors];
};

export const requiredField = (fieldName: string, customMessage?: string) =>
  body(fieldName).notEmpty().withMessage(customMessage || `${fieldName} is required`);

export const requiredStringField = (fieldName: string, customMessage?: string) =>
  body(fieldName).notEmpty().withMessage(customMessage || `${fieldName} is required`).isString().withMessage(`${fieldName} must be a string`);

export const requiredNumberField = (fieldName: string, customMessage?: string) =>
  body(fieldName).notEmpty().withMessage(customMessage || `${fieldName} is required`).isNumeric().withMessage(`${fieldName} must be a number`);

export const requiredParamField = (paramName: string, customMessage?: string) =>
  param(paramName).notEmpty().withMessage(customMessage || `${paramName} is required`);
export const requiredMailField = (fieldName: string, customMessage?: string) =>
  body(fieldName).notEmpty().withMessage(customMessage || `${fieldName} is required`).isEmail().withMessage(`${fieldName} must be a valid email`);