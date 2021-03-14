import React from 'react';
import axios from '../axios-base';
import { Input, FormControl, Button } from '@material-ui/core';
import { toast } from 'react-toastify';

const { useState, useEffect, useCallback } = React;

const SearchBar = () => {
  const [text, setText] = useState('');

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`movies/search-by-title?t=${text}`);
      toast.success(`Movie: "${data.Title}" found!`);
    } catch(err) {
      toast.error(`Movie: "${text}" not found!`);
    }
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
