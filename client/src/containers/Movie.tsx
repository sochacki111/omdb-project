import React, { useState, useEffect } from 'react';
import { match } from 'react-router-dom';
import axios from '../axios-base';
import { DataGrid, GridRowParams, GridColDef } from '@material-ui/data-grid';
import { Input, FormControl, Button } from '@material-ui/core';

const commentColumns: GridColDef[] = [
  { field: 'ownerName', headerName: 'Owner Name', flex: 0.2 },
  { field: 'text', headerName: 'text', flex: 1 }
];

const Movie = (props: any) => {
  const [movie, setMovie] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [text, setText] = useState<string>('');
  const [ownerName, setOwnerName] = useState<string>('');

  const movieId = props.match.params.id;

  const fetchMovie = async () => {
    const { data } = await axios.get(`/movies/${movieId}`);
    setMovie(data);
  };

  const fetchComments = async () => {
    const { data } = await axios.get(`/movies/${movieId}/comments`);
    setComments(
      data.map((comment: any) => {
        return { id: comment._id, ...comment };
      })
    );
  };

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(e.target);

    const { data } = await axios.post(`/movies/${movieId}/comments`, {
      text,
      ownerName
    });
    console.log(data);
    fetchComments();
  };

  useEffect(() => {
    fetchMovie();
    fetchComments();
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
    <div style={{ height: 400, width: '100%' }}>
      <h1>{movie && movie.Title}</h1>
      {theMovie}
      <h2>Comments</h2>
      <DataGrid
        rows={comments}
        columns={commentColumns}
        pageSize={5}
        disableSelectionOnClick
      />
      <form onSubmit={handleCommentSubmit}>
        <FormControl>
          <Input
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setOwnerName(e.target.value)
            }
            placeholder="Enter your name"
            required
          />
        </FormControl>
        <FormControl>
          <Input
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setText(e.target.value)
            }
            placeholder="Enter your comment"
            required
          />
        </FormControl>
        <Button type="submit" value="Submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Movie;
