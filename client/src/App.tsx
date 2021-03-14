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
      {/* <Route path="/movies/:id" component={Movie}></Route> */}
      {/* <Route path="/movies" component={Movies}></Route> */}
      {/* <Route path="/comments" component={Comments}></Route> */}
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
          </Toolbar>
        </AppBar>
      </div>
      <main>
        {routes}
        <Movies />
      </main>
    </div>
  );
}

export default App;
