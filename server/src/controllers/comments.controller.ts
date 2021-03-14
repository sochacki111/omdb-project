import { Request, Response, NextFunction } from 'express';
import Movie from '../models/movie';
import Comment from '../models/comment';
import logger from '../config/logger';
import Error from '../interfaces/error.interface';

class CommentsController {
  private static instance: CommentsController;

  static getInstance() {
    if (!CommentsController.instance) {
      CommentsController.instance = new CommentsController();
    }
    return CommentsController.instance;
  }

  // eslint-disable-next-line class-methods-use-this
  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const commentToCreate = {
        text: req.body.text,
        ownerName: req.body.ownerName,
        movie: req.params.id
      };

      const movie = await Movie.findOne({ _id: req.params.id });
      const errorMessages: Error[] = [];
      if (!movie) {
        errorMessages.push({
          message: 'movie not found!'
        });
        return res.status(404).send({ errors: errorMessages });
      }

      const createdComment = await Comment.create(commentToCreate);
      await Movie.findByIdAndUpdate(req.params.id, {
        $push: { comments: createdComment._id }
      })
        .lean()
        .exec();
      return res.status(201).send(createdComment);
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
      const foundComments = await Comment.find({});
      return res.status(200).send(foundComments);
    } catch (err) {
      logger.debug(err);
      return res.status(500).send(err);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  public async findAllByMovieId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    try {
      const movieId = req.params.id;
      const errorMessages: Error[] = [];

      const foundMovie = await Movie.findById(movieId);
      if (!foundMovie) {
        errorMessages.push({
          message: 'movie not found!'
        });
        return res.status(404).send({ errors: errorMessages });
      }
      const commentIds = { _id: { $in: foundMovie.comments } };
      const foundComments = await Comment.find(commentIds);

      return res.status(200).send(foundComments);
    } catch (err) {
      logger.debug(err);
      return res.status(500).send(err);
    }
  }
}

export default CommentsController.getInstance();
