import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../axios-base';
import { DataGrid, GridRowParams, GridColDef } from '@material-ui/data-grid';

const columns: GridColDef[] = [
  { field: '_id', headerName: 'ID', flex: 0.2 },
  { field: 'Title', headerName: 'Title', flex: 1 }
];

export default function Movies() {
  // TODO Add Movie interface
  const [movies, setMovies] = useState<any[]>([]);

  let history = useHistory();

  const fetchMovies = async () => {
    const { data } = await axios.get(`/movies`);
    setMovies(
      data.map((movie: any) => {
        return { id: movie._id, ...movie };
      })
    );
  };

  const handleClick = (param: GridRowParams) => {
    history.push(`/movies/${param.row.id}`);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const isMoviesEmpty = movies.length ? true : false;

  return (
    <div style={{ height: 400, width: '100%' }}>
      {isMoviesEmpty && (
        <DataGrid
          rows={movies}
          columns={columns}
          pageSize={5}
          disableSelectionOnClick
          onRowClick={handleClick}
        />
      )}
    </div>
  );
}
