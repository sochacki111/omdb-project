import mongoose, { Schema, Document } from 'mongoose';

export interface IRating extends Document {
  Source: string;
  Value: string;
}

export interface IMovie extends Document {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: IRating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
  comments: string[];
}

const RatingSchema: Schema = new Schema({
  Source: { type: String, required: true },
  Value: { type: String, required: true }
});

const MovieSchema: Schema = new Schema(
  {
    Title: { type: String, required: true },
    Year: { type: String, required: true },
    Rated: { type: String, required: true },
    Released: { type: String, required: true },
    Runtime: { type: String, required: true },
    Genre: { type: String, required: true },
    Director: { type: String, required: true },
    Writer: { type: String, required: true },
    Actors: { type: String, required: true },
    Plot: { type: String, required: true },
    Language: { type: String, required: true },
    Country: { type: String, required: true },
    Awards: { type: String, required: true },
    Poster: { type: String, required: true },
    Ratings: [RatingSchema],
    Metascore: { type: String, required: true },
    imdbRating: { type: String, required: true },
    imdbVotes: { type: String, required: true },
    imdbID: { type: String, required: true },
    Type: { type: String, required: true },
    DVD: { type: String, required: true },
    BoxOffice: { type: String, required: true },
    Production: { type: String, required: true },
    Website: { type: String, required: true },
    Response: { type: String, required: true },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ]
  },
  {
    timestamps: true
  }
);

const Movie = mongoose.model<IMovie>('Movie', MovieSchema);

export default Movie;
