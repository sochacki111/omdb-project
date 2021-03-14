import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import axios from './axios-base';
import {
  Input,
  FormControl,
  Button,
  AppBar,
  Toolbar,
  Typography
} from '@material-ui/core';
import './App.css';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import SearchBar from './containers/SearchBar';
import Movies from './containers/Movies';
import Movie from './containers/Movie';
import Comments from './containers/Comments';

const { useState, useEffect, useCallback } = React;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    title: {
      flexGrow: 1,
      marginLeft: theme.spacing(10)
    }
  })
);

function App() {
  const classes = useStyles();

  const routes = (
    <Switch>
      <Route path="/movies/:id" component={Movie}></Route>
      <Route path="/comments" component={Comments}></Route>
      <Route path="/movies" component={Movies}></Route>
      <Route path="/" exact component={SearchBar} />
      <Redirect to="/" />
    </Switch>
  );

  return (
    <div className="App">
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              omdb-project
            </Typography>
            <Button color="inherit" component={Link} to="/movies">
              Movies
            </Button>
            <Button color="inherit" component={Link} to="/">
              Search movie
            </Button>
            <Button color="inherit" component={Link} to="/comments">
              Comments
            </Button>
          </Toolbar>
        </AppBar>
      </div>
      <main>
        {routes}
      </main>
    </div>
  );
}

export default App;
