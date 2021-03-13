import { Router } from 'express';
import CommentsController from '../controllers/comments.controller';

const router = Router();

router.get('/', CommentsController.findAll);

export default router;
