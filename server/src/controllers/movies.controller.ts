import { Request, Response, NextFunction } from 'express';
import axios from '../utils/axios-omdb';
import Movie from '../models/movie';
import logger from '../config/logger';

class MoviesController {
  private static instance: MoviesController;

  static getInstance() {
    if (!MoviesController.instance) {
      MoviesController.instance = new MoviesController();
    }
    return MoviesController.instance;
  }

  // eslint-disable-next-line class-methods-use-this
  public async findOne(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const title = req.query.t;
    const { data } = await axios.get(
      `?t=${title}&type=movie&apikey=${process.env.OMDB_API_KEY}`
    );
    const createdMovie = await Movie.create(data);
    logger.debug(`Created movie: ${createdMovie}`);
    return res.status(200).send(data);
  }
}

export default MoviesController.getInstance();
