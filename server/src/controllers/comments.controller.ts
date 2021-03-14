import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Movie from '../models/movie';
import Comment, { IComment } from '../models/comment';
import logger from '../config/logger';

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
    const commentToCreate = {
      text: req.body.text,
      ownerName: req.body.ownerName,
      movie: req.params.id
    };

    // TODO Check if movie exists

    const createdComment = await Comment.create(commentToCreate);
    await Movie.findByIdAndUpdate(req.params.id, {
      $push: { comments: createdComment._id }
    })
      .lean()
      .exec();
    return res.status(201).send(createdComment);
  }

  // eslint-disable-next-line class-methods-use-this
  public async findAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const foundComments = await Comment.find({});
    return res.status(200).send(foundComments);
  }

  // eslint-disable-next-line class-methods-use-this
  public async findAllByMovieId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const movieId = req.params.id;
    let foundMovie = null;
    let commentIds = {};

    // TODO Use comment populate?
    if (movieId) {
      foundMovie = await Movie.findById(movieId);
      if (foundMovie) {
        commentIds = { _id: { $in: foundMovie.comments } };
      }
    }
    const foundComments = await Comment.find(commentIds);

    return res.status(200).send(foundComments);
  }
}

export default CommentsController.getInstance();
