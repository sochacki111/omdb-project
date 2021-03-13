import { Router } from 'express';
import MoviesController from '../controllers/movies.controller';
import CommentsController from '../controllers/comments.controller';

const router = Router();

router.get('/search-by-title', MoviesController.searchByTitle);
router.get('/:id', MoviesController.findById);
router.get('/', MoviesController.findAll);
router.get('/:id/comments', CommentsController.findAllByMovieId);
router.post('/:id/comments', CommentsController.create);

export default router;
