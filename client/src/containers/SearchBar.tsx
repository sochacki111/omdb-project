import React from 'react';
import axios from '../axios-base';
import { Input, FormControl, Button } from '@material-ui/core';
const { useState, useEffect, useCallback } = React;

const SearchBar = () => {
  const [text, setText] = useState('');

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await axios.get(`movies/search-by-title?t=${text}`);
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <FormControl>
          <Input
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setText(e.target.value)
            }
            placeholder="Search movie by title"
            required
          />
        </FormControl>
        <Button type="submit" value="Submit">
          Search
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;
