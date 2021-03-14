import React, { useState, useEffect } from 'react';
import { match } from 'react-router-dom';
import axios from '../axios-base';

const Movie = (props: any) => {
  const [movie, setMovie] = useState<any>(null);
  const photoId = props.match.params.id;

  const fetchMovie = async () => {
    const { data } = await axios.get(`/movies/${photoId}`);
    setMovie(data);
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  let theMovie = null;
  if (movie !== null) {
    theMovie = (
      <div>
        <img src={movie.Poster} alt="poster" />
        <p>
          <strong>Title:</strong> {movie.Title}
        </p>
        <p>
          <strong>Plot:</strong> {movie.Plot}
        </p>
        <p>
          <strong>Released:</strong> {movie.Released}
        </p>
        <p>
          <strong>Director:</strong> {movie.Director}
        </p>
        <p>
          <strong>Writer:</strong> {movie.Writer}
        </p>
        <p>
          <strong>Actors:</strong> {movie.Actors}
        </p>
      </div>
    );
  }

  return (
    <div>
      {theMovie}
    </div>
  );
};

export default Movie;
