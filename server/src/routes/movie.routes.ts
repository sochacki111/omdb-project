import { Router } from 'express';
import MoviesController from '../controllers/movies.controller';

const router = Router();

router.get('/', MoviesController.findOne);

export default router;
