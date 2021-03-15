import { Router } from 'express';
import CommentsController from '../controllers/comments.controller';

const router = Router();

/**
 * @swagger
 * /comments:
 *  get:
 *    summary: Get all comments
 *    tags:
 *      - comments
 *    description: Use to request all comments
 *    responses:
 *      '200':
 *        description: A successful response of all comments
 *        content:
 *          application/json:
 *            example:
 *              - _id: 604ca72156b3bd830044a7bc
 *                text: awesome film!
 *                ownerName: john doe
 *                movie: 604c7418f0aa5d2b98d9ce2a
 *                createdAt: 2021-03-13T11:50:57.046Z
 *                updatedAt: 2021-03-13T11:50:57.046Z
 *                __v: 0
 *              - _id: 604ca72156b3bd830044a7bc
 *                text: great film!
 *                ownerName: john white
 *                movie: 604c7418f0aa5d2b98d9ce2a
 *                createdAt: 2021-03-13T11:51:57.046Z
 *                updatedAt: 2021-03-13T11:51:57.046Z
 *                __v: 0
 *      '500':
 *        description: Server error
 */
router.get('/', CommentsController.findAll);

export default router;
