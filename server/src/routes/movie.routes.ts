import { Router } from 'express';
import MoviesController from '../controllers/movies.controller';
import CommentsController from '../controllers/comments.controller';
import validateRules from '../middlewares/validateRules';
import {
  createCommentValidator,
  searchByTitleValidator,
  findByIdValidator,
  findAllByMovieIdValidator
} from '../validators/validator';

const router = Router();

router.get(
  '/search-by-title',
  searchByTitleValidator(),
  validateRules,
  MoviesController.searchByTitle
);
router.get(
  '/:id',
  findByIdValidator(),
  validateRules,
  MoviesController.findById
);
router.get('/', MoviesController.findAll);
router.get(
  '/:id/comments',
  findAllByMovieIdValidator(),
  validateRules,
  CommentsController.findAllByMovieId
);
router.post(
  '/:id/comments',
  createCommentValidator(),
  validateRules,
  CommentsController.create
);

export default router;
