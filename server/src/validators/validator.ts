import { body, ValidationChain, query, param } from 'express-validator';
import mongoose from 'mongoose';

// TODO Extract common
export const createCommentValidator = (): ValidationChain[] => [
  body('text').notEmpty().withMessage('text cannot be empty'),
  body('ownerName').notEmpty().withMessage('text cannot be empty'),
  param('id').custom(
    async (value, { req }): Promise<boolean> => {
      const isValid = mongoose.Types.ObjectId.isValid(value);
      if (!isValid) {
        return Promise.reject(new Error('movie id not valid'));
      }
      return true;
    }
  )
];

export const searchByTitleValidator = (): ValidationChain[] => [
  query('t').notEmpty().withMessage('movie title cannot be empty')
];

export const findByIdValidator = (): ValidationChain[] => [
  param('id').custom(
    async (value, { req }): Promise<boolean> => {
      const isValid = mongoose.Types.ObjectId.isValid(value);
      if (!isValid) {
        return Promise.reject(new Error('id not valid'));
      }
      return true;
    }
  )
];

export const findAllByMovieIdValidator = (): ValidationChain[] => [
  param('id').custom(
    async (value, { req }): Promise<boolean> => {
      const isValid = mongoose.Types.ObjectId.isValid(value);
      if (!isValid) {
        return Promise.reject(new Error('movie id not valid'));
      }
      return true;
    }
  )
];
