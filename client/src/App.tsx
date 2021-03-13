import React from 'react';
import axios from './axios-base';
import { Input, FormControl, Button } from '@material-ui/core';
import './App.css';
const { useState, useEffect, useCallback } = React;

function App() {
  const [text, setText] = useState('');

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await axios.get(`movies/search-by-title?t=${text}`);
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <FormControl>
          <Input
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setText(e.target.value)
            }
          />
        </FormControl>
        <Button type="submit" value="Submit">
          Search
        </Button>
      </form>
    </div>
  );
}

export default App;
