import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

import movieRoutes from './routes/movie.routes';
import commentRoutes from './routes/comment.routes';

// Create a new express app instance
const app: Application = express();

// Middlewares
app.use(cors());
// TODO
app.use(morgan('dev'));

app.set('port', process.env.PORT || 8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Swagger

// Routes
app.get('/', (req, res) => {
  res.send('Hello world!');
});
app.use('/movies', movieRoutes);
app.use('/comments', commentRoutes);

export default app;
