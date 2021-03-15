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

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         text:
 *           type: string
 *           example: "test comment"
 *         ownerName:
 *            type: string
 *            example: "john doe"
 */

/**
 * @swagger
 * /movies/search-by-title:
 *  get:
 *    summary: Get movie by id
 *    tags:
 *      - movies
 *    description: Use to request specific movie
 *    responses:
 *      '200':
 *        description: A successful response of movie details
 *        content:
 *          application/json:
 *            example:
 *              comments: []
 *              _id: 604d1cafb1c1a38a101dfa47
 *              Title: The Cat in the Hat
 *              Year: '2003'
 *              Rated: PG
 *              Released: 21 Nov 2003
 *              Runtime: 82 min
 *              Genre: Adventure, Comedy, Family, Fantasy
 *              Director: Bo Welch
 *              Writer: Dr. Seuss (book), Alec Berg (screenplay), David Mandel (screenplay), Jeff
 *                Schaffer (screenplay)
 *              Actors: Mike Myers, Alec Baldwin, Kelly Preston, Dakota Fanning
 *              Plot: Two bored children have their lives turned upside down when a talking cat comes
 *                to visit them.
 *              Language: English
 *              Country: USA
 *              Awards: 7 wins & 22 nominations.
 *              Poster: https://m.media-amazon.com/images/M/MV5BMTI5MDU3MTYyMF5BMl5BanBnXkFtZTYwODgyODc3._V1_SX300.jpg
 *              Ratings:
 *              - _id: 604d1cafb1c1a38a101dfa48
 *                Source: Internet Movie Database
 *                Value: 4.0/10
 *              - _id: 604d1cafb1c1a38a101dfa49
 *                Source: Rotten Tomatoes
 *                Value: 9%
 *              - _id: 604d1cafb1c1a38a101dfa4a
 *                Source: Metacritic
 *                Value: 19/100
 *              Metascore: '19'
 *              imdbRating: '4.0'
 *              imdbVotes: '52,536'
 *              imdbID: tt0312528
 *              Type: movie
 *              DVD: 04 Feb 2014
 *              BoxOffice: "$101,149,285"
 *              Production: Alphaville Films, Imagine Entertainment, DreamWorks SKG, Universal Pictures
 *              Website: N/A
 *              Response: 'True'
 *              createdAt: '2021-03-13T20:12:31.636Z'
 *              updatedAt: '2021-03-13T20:12:31.636Z'
 *              __v: 0
 *      '402':
 *        description: Validation error
 *        content:
 *          application/json:
 *            example:
 *              errors:
 *              - message: movie title cannot be empty
 *      '404':
 *        description: Movie with provided title not found
 *      '500':
 *        description: Server error
 *    parameters:
 *      - in: query
 *        name: t
 *        schema:
 *          type: string
 *        required: true
 *        description: search title
 */
router.get(
  '/search-by-title',
  searchByTitleValidator(),
  validateRules,
  MoviesController.searchByTitle
);
/**
 * @swagger
 * /movies/{id}:
 *  get:
 *    summary: Get movie by id
 *    tags:
 *      - movies
 *    description: Use to request specific movie
 *    responses:
 *      '200':
 *        description: A successful response of movie details
 *        content:
 *          application/json:
 *            example:
 *              comments:
 *              - 604ca846dddd2475144e94c5
 *              - 604ca861dddd2475144e94c6
 *              - 604e46aa0cc2c12b6cbaf485
 *              - 604e479a0cc2c12b6cbaf486
 *              - 604e47b90cc2c12b6cbaf487
 *              - 604e51d6c609013d144d4e1c
 *              - 604e7cf9734b7b6afc603632
 *              - 604e7d06734b7b6afc603633
 *              - 604e9dc27be59f28fc0e303c
 *              - 604ea10e0283e8265c425972
 *              _id: 604c7418f0aa5d2b98d9ce2a
 *              Title: 'El Camino: A Breaking Bad Movie'
 *              Year: '2019'
 *              Rated: TV-MA
 *              Released: 11 Oct 2019
 *              Runtime: 122 min
 *              Genre: Action, Crime, Drama
 *              Director: Vince Gilligan
 *              Writer: Vince Gilligan, Vince Gilligan (based on "Breaking Bad" by)
 *              Actors: Aaron Paul, Jonathan Banks, Matt Jones, Charles Baker
 *              Plot: Fugitive Jesse Pinkman runs from his captors, the law, and his past.
 *              Language: English
 *              Country: USA
 *              Awards: Nominated for 4 Primetime Emmys. Another 4 wins & 18 nominations.
 *              Poster: https://m.media-amazon.com/images/M/MV5BNjk4MzVlM2UtZGM0ZC00M2M1LThkMWEtZjUyN2U2ZTc0NmM5XkEyXkFqcGdeQXVyOTAzMTc2MjA@._V1_SX300.jpg
 *              Ratings:
 *              - _id: 604c7418f0aa5d2b98d9ce2b
 *                Source: Internet Movie Database
 *                Value: 7.3/10
 *              - _id: 604c7418f0aa5d2b98d9ce2c
 *                Source: Rotten Tomatoes
 *                Value: 91%
 *              - _id: 604c7418f0aa5d2b98d9ce2d
 *                Source: Metacritic
 *                Value: 72/100
 *              Metascore: '72'
 *              imdbRating: '7.3'
 *              imdbVotes: '185,086'
 *              imdbID: tt9243946
 *              Type: movie
 *              DVD: 11 Oct 2019
 *              BoxOffice: N/A
 *              Production: American Movie Classics, Sony Pictures Television, Netflix
 *              Website: N/A
 *              Response: 'True'
 *              createdAt: '2021-03-13T08:13:12.520Z'
 *              updatedAt: '2021-03-14T23:49:34.304Z'
 *              __v: 0
 *      '402':
 *        description: Validation error
 *        content:
 *          application/json:
 *            example:
 *              errors:
 *              - message: id not valid
 *      '404':
 *        description: Movie with provided id not found
 *      '500':
 *        description: Server error
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: movie id
 */
router.get(
  '/:id',
  findByIdValidator(),
  validateRules,
  MoviesController.findById
);
/**
 * @swagger
 * /movies:
 *  get:
 *    summary: Get all movies
 *    tags:
 *      - movies
 *    description: Use to request all movies
 *    responses:
 *      '200':
 *        description: A successful response of all movies
 *        content:
 *          application/json:
 *            example:
 *              - _id: 604c7418f0aa5d2b98d9ce2a
 *                Title: "El Camino: A Breaking Bad Movie"
 *              - _id: 604cee38659f748920c05f1d
 *                Title: South Paw
 *      '500':
 *        description: Server error
 */
router.get('/', MoviesController.findAll);
/**
 * @swagger
 * /movies/{id}/comments:
 *  get:
 *    summary: Get all comments by movie id
 *    tags:
 *      - movies
 *    description: Use to request all comments by movie id
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
 *              - _id: 604ca72156b3bd830044a7bc
 *                text: great film!
 *                ownerName: john white
 *                movie: 604c7418f0aa5d2b98d9ce2a
 *                createdAt: 2021-03-13T11:51:57.046Z
 *                updatedAt: 2021-03-13T11:51:57.046Z
 *      '402':
 *        description: Validation error
 *        content:
 *          application/json:
 *            example:
 *              errors:
 *              - message: movie not found!
 *      '404':
 *        description: Movie not found
 *        content:
 *          application/json:
 *            example:
 *              errors:
 *                - message: movie not found!
 *      '500':
 *        description: Server error
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: movie id
 */
router.get(
  '/:id/comments',
  findAllByMovieIdValidator(),
  validateRules,
  CommentsController.findAllByMovieId
);
/**
 * @swagger
 * /movies/{id}/comments:
 *  post:
 *    summary: Create comment related to movie
 *    tags:
 *      - comments
 *    description: Use to create comment related to movie
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/Comment"
 *    responses:
 *      '201':
 *        description: A successful response of created comment
 *        content:
 *          application/json:
 *            example:
 *              _id: 604e9dc27be59f28fc0e303c
 *              text: halo
 *              ownerName: john
 *              movie: 604c7418f0aa5d2b98d9ce2a
 *              createdAt: '2021-03-14T23:35:30.522Z'
 *              updatedAt: '2021-03-14T23:35:30.522Z'
 *              __v: 0
 *      '402':
 *        description: Validation error
 *        content:
 *          application/json:
 *            example:
 *              errors:
 *              - message: text cannot be empty
 *      '404':
 *        description: Movie not found
 *        content:
 *          application/json:
 *            example:
 *              errors:
 *                - message: movie not found!
 *      '500':
 *        description: Server error
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: movie id
 */
router.post(
  '/:id/comments',
  createCommentValidator(),
  validateRules,
  CommentsController.create
);

export default router;
