import { Request, Response, NextFunction } from 'express';
import axios from '../utils/axios-omdb';
import Movie from '../models/movie';
import logger from '../config/logger';
import Error from '../interfaces/error.interface';

class MoviesController {
  private static instance: MoviesController;

  static getInstance() {
    if (!MoviesController.instance) {
      MoviesController.instance = new MoviesController();
    }
    return MoviesController.instance;
  }

  // eslint-disable-next-line class-methods-use-this
  public async searchByTitle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const title = req.query.t;
      // TODO Add Redis for cache data fetching
      const { data } = await axios.get(
        `?t=${title}&type=movie&apikey=${process.env.OMDB_API_KEY}`
      );
      const errorMessages: Error[] = [];
      if (data.Error) {
        errorMessages.push({
          message: data.Error
        });
        return res.status(404).send({ errors: errorMessages });
      }
      let movie = await Movie.findOne({ imdbID: data.imdbID });
      if (!movie) {
        movie = await Movie.create(data);
        logger.debug(`Saved movie: ${movie.Title}`);
      }

      return res.status(200).send(movie);
    } catch (err) {
      logger.debug(err);
      return res.status(500).send(err);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  public async findAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const foundPhotos = await Movie.find({}, '_id Title');
      return res.status(200).send(foundPhotos);
    } catch (err) {
      logger.debug(err);
      return res.status(500).send(err);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  public async findById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const foundMovie = await Movie.findById(req.params.id);
      if (!foundMovie) {
        return res.status(404).send();
      }

      return res.status(200).send(foundMovie);
    } catch(err) {
      logger.debug(err);
      return res.status(500).send(err);
    }
  }
}

export default MoviesController.getInstance();
